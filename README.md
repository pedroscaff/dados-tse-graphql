dados-tse-graphql
=======================

Backend em [GraphQL](https://graphql.org/) para facilitar obter os dados divulgados pelo [TSE](http://www.tse.jus.br/) dos candidados.

## Como usar

### Setup do banco de dados

- Download dos dados
```bash
./get-data.sh
```

- Iniciar a MongoDB (processo deve ficar aberto)
```bash
mongod
```

- Povoar o banco de dados
```bash
npm run create-db
```

- Iniciar o app

```bash
npm i
npm start
```

Em `http://localhost:4000` estara um webapp para fazer queries e o endpoint da api.

### TODO

- [ ] agregar informacoes de diferentes anos
