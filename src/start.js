const { GraphQLServer } = require('graphql-yoga')
const MongoClient = require('mongodb').MongoClient

const handlers = require('./handlers')

const url = 'mongodb://localhost:27017/'

module.exports = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('eleicoes')
    const resolvers = {
      Query: {
        candidato: (root, args) => handlers.candidato(root, args, db),
        candidatos: (root, args, context, info) => handlers.listaCandidatos(root, args, context, info, db),
        buscaPorNome: (root, args, context, info) => handlers.buscaPorNome(root, args, context, info, db)
      }
    }

    const server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers
    })
    server.start(() => console.log(`Server is running on http://localhost:4000`))
  } catch (e) {
    console.log(e)
  }
}
