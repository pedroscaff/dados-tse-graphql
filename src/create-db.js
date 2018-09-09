const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const colors = require('colors')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const UFs = require('./uf')

const eleicoes = require('./metadata')

function createBensDB (db, uf) {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(
      `./data/bem_candidato_2014/bem_candidato_2014_${ uf.toUpperCase() }.txt`
    )
    const stream = fs.createReadStream(filepath)
    const parsedData = {}
    const csvStream = csv
      .parse({
        delimiter: ';',
        headers: HEADERS_BEM_CANDIDATO
      })
      .on('data', data => {
        data['VALOR_BEM'] = +data['VALOR_BEM']
        data['CD_TIPO_BEM_CANDIDATO'] = +data['CD_TIPO_BEM_CANDIDATO']
        data['ANO_ELEICAO'] = +data['ANO_ELEICAO']
        const id = data['SQ_CANDIDATO']
        if (!parsedData[id]) {
          parsedData[id] = {}
          parsedData[id]._id = id
          parsedData[id].bens = []
        }
        parsedData[id].bens.push(data)
      })
      .on('end', () => {
        const collection = db.collection(`bens-candidatos-${ uf }`)
        collection.drop(() => {
          const data = []
          Object.keys(parsedData).forEach(key => data.push(parsedData[key]))
          collection.insertMany(data)
          .then(res => {
            assert.equal(res.insertedCount, data.length)
            console.log(colors.green('created bens collection'))
            resolve()
          })
          .catch(reject)
        })
      })

    stream.pipe(csvStream)
  })
}

function createCandidatosDB (db, uf, { headers, map, ano, extension }) {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(
      `./data/consulta_cand_${ ano }/consulta_cand_${ ano }_${ uf.toUpperCase() }.${ extension }`
    )
    const stream = fs.createReadStream(filepath)
    const parsedData = []
    const csvStream = csv
      .parse({
        delimiter: ';',
        headers: headers
      })
      .on('data', data => {
        const schemaColumns = {}
        Object.keys(data).forEach(key => {
          const schemaColumn = map.get(key)
          if (schemaColumn) {
            schemaColumns[schemaColumn] = data[key]
          }
        })
        schemaColumns._id = schemaColumns.id
        schemaColumns.codigoCargo = +schemaColumns.codigoCargo
        schemaColumns.numeroPartido = +schemaColumns.numeroPartido
        if (parsedData.filter(parsed => parsed._id === schemaColumns._id).length > 0) {
          console.log(`duplicate entry ${ schemaColumns._id }`)
        } else {
          parsedData.push(schemaColumns)
        }
      })
      .on('end', () => {
        const collection = db.collection(`candidatos-${ uf }-${ ano }`)
        collection.drop(() => {
          collection.insertMany(parsedData)
          .then(res => {
            assert.equal(res.insertedCount, parsedData.length)
            console.log(colors.green('created candidatos collection'))
            resolve()
          })
          .catch(reject)
        })
      })

    stream.pipe(csvStream)
  })
}

const url = 'mongodb://localhost:27017'
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err)
  const db = client.db('eleicoes')
  const promises = []
  UFs.forEach(uf => {
    eleicoes.forEach(eleicao => {
      // promises.push(createBensDB(db, uf))
      promises.push(createCandidatosDB(db, uf, {
        headers: eleicao.consultaCandidato.headers,
        map: eleicao.consultaCandidato.map,
        ano: eleicao.ano,
        extension: eleicao.extension
      }))
    })
  })
  Promise.all(promises).then(() => {
    console.log(colors.green.bold('databased is up and running!'))
    client.close()
  }).catch(err => {
    console.log('could not create db', err)
    client.close()
  })
})
