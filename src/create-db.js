const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const colors = require('colors')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const UFs = require('./uf')

const {
  HEADERS_BEM_CANDIDATO,
  HEADERS_CONSULTA_CANDIDATO
} = require('./headers')

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

function createCandidatosDB (db, uf) {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(
      `./data/consulta_cand_2014/consulta_cand_2014_${ uf.toUpperCase() }.txt`
    )
    const stream = fs.createReadStream(filepath)
    const parsedData = []
    const csvStream = csv
      .parse({
        delimiter: ';',
        headers: HEADERS_CONSULTA_CANDIDATO
      })
      .on('data', data => {
        data._id = data['SEQUENCIAL_CANDIDATO']
        data['CODIGO_CARGO'] = +data['CODIGO_CARGO']
        data['NUMERO_PARTIDO'] = +data['NUMERO_PARTIDO']
        if (parsedData.filter(parsed => parsed._id === data._id).length > 0) {
          console.log(`duplicate entry ${ data._id }`)
        } else {
          parsedData.push(data)
        }
      })
      .on('end', () => {
        const collection = db.collection(`candidatos-${ uf }`)
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
    promises.push(createBensDB(db, uf)),
    promises.push(createCandidatosDB(db, uf))
  })
  Promise.all(promises).then(() => {
    console.log(colors.green.bold('databased is up and running!'))
    client.close()
  }).catch(err => {
    console.log('could not create db', err)
    client.close()
  })
})
