const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const getFieldNames = require('graphql-list-fields')

const getBensCandidato = async (id, uf, db) => {
  const result = await db.collection(`bens-candidatos-${ uf.toLowerCase() }`).find({
    _id: id
  }).toArray()
  return result[0] && result[0].bens
}

const getInfoCandidato = async (query, { uf, ano }, db) => {
  return await db.collection(`candidatos-${ uf.toLowerCase() }-${ ano }`).find(query).toArray()
}

module.exports = {
  buscaPorNome: async (root, args, context, info, db) => {
    const { nome, uf, ano } = args
    const candidatos = await db.collection(`candidatos-${ uf.toLowerCase() }-${ ano }`).find({
      $or: [
        { nome: { $regex: nome, $options: 'i' } },
        { nomeUrna: { $regex: nome, $options: 'i' } }
      ]
    }).toArray()
    console.log(candidatos)
    const fields = getFieldNames(info)
    const requestBens = fields.filter(field => field.includes('bens')).length > 0
    if (requestBens) {
      candidatos.forEach(candidato => {
        candidato.bens = getBensCandidato(candidato._id, uf, db)
      })
    }
    return candidatos
  },
  candidato: async (root, args, db) => {
    const { id, uf, ano } = args
    const infoCandidato = getInfoCandidato({
      _id: id
    }, { uf, ano }, db)
    const bens = getBensCandidato(id, uf, db)

    return await Promise.all([infoCandidato, bens]).then(values => {
      const candidato = values[0][0]
      if (candidato) {
        candidato.bens = values[1]
      }
      return candidato
    })
  },
  listaCandidatos: async (root, args, context, info, db) => {
    const { cargo, uf, partido, ano } = args
    const fields = getFieldNames(info)
    const generalQuery = {
      codigoCargo: cargo
    }
    if (partido) {
      generalQuery.numeroPartido = partido
    }
    const infoCandidato = await getInfoCandidato(generalQuery, { uf, ano }, db)
    const requestBens = fields.filter(field => field.includes('bens')).length > 0
    if (requestBens) {
      infoCandidato.forEach(candidato => {
        candidato.bens = getBensCandidato(candidato._id, uf, db)
      })
    }
    return infoCandidato
  }
}