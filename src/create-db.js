const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const colors = require('colors')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const UFs = require('./uf')

const eleicoes = require('./metadata')

function createBensDB (db, uf, { headers, map, ano, extension }) {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(
      `./data/bem_candidato_${ano}/utf-8-bem_candidato_${ano}_${uf.toUpperCase()}.${extension}`
    )
    const stream = fs.createReadStream(filepath)
    const parsedData = {}
    const csvStream = csv
      .parse({
        delimiter: ';',
        headers
      })
      .on('data', data => {
        const formattedData = {}
        Object.keys(data).forEach(key => {
          const schemaColumn = map.get(key)
          if (schemaColumn) {
            formattedData[schemaColumn] = data[key]
          }
        })
        formattedData.valor = formattedData.valor.replace(/,/g, '.')
        formattedData.valor = +formattedData.valor
        formattedData.codigo = +formattedData.codigo
        const id = formattedData.id
        if (!parsedData[id]) {
          parsedData[id] = {}
          parsedData[id]._id = id
          parsedData[id].bens = []
        }
        parsedData[id].bens.push(formattedData)
      })
      .on('end', () => {
        const collectionName = `bens-candidatos-${uf}-${ano}`
        const collection = db.collection(collectionName)
        collection.drop(() => {
          const data = []
          Object.keys(parsedData).forEach(key => data.push(parsedData[key]))
          collection.insertMany(data)
            .then(res => {
              assert.strictEqual(res.insertedCount, data.length)
              console.log(colors.green(`created bens collection ${collectionName}`))
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
      `./data/consulta_cand_${ano}/utf-8-consulta_cand_${ano}_${uf.toUpperCase()}.${extension}`
    )
    const stream = fs.createReadStream(filepath)
    const parsedData = []
    const csvStream = csv
      .parse({
        delimiter: ';',
        headers
      })
      .on('data', data => {
        const formattedData = {}
        Object.keys(data).forEach(key => {
          const schemaColumn = map.get(key)
          if (schemaColumn) {
            formattedData[schemaColumn] = data[key]
          }
        })
        formattedData._id = formattedData.id
        formattedData.codigoCargo = +formattedData.codigoCargo
        formattedData.numeroPartido = +formattedData.numeroPartido
        if (parsedData.filter(parsed => parsed._id === formattedData._id).length > 0) {
          console.warn(`duplicate entry ${formattedData._id} in ${filepath}`)
        } else {
          parsedData.push(formattedData)
        }
      })
      .on('end', () => {
        const collectionName = `candidatos-${uf}-${ano}`
        const collection = db.collection(collectionName)
        collection.drop(() => {
          collection.insertMany(parsedData)
            .then(res => {
              assert.strictEqual(res.insertedCount, parsedData.length)
              console.log(colors.green(`created candidatos collection ${collectionName}`))
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
  assert.strictEqual(null, err)
  const db = client.db('eleicoes')
  const promises = []
  UFs.forEach(uf => {
    eleicoes.forEach(eleicao => {
      promises.push(createBensDB(db, uf, {
        headers: eleicao.bensCandidato.headers,
        map: eleicao.bensCandidato.map,
        ano: eleicao.ano,
        extension: eleicao.extension
      }))
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
