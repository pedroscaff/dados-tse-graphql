dados-tse-graphql
=======================

Backend em [GraphQL](https://graphql.org/) e [MongoDB](https://www.mongodb.com/) para facilitar obter os dados divulgados pelo [TSE](http://www.tse.jus.br/) dos candidados. No momento estao disponiveis as eleicoes de 2014 e 2018.

Query

```graphql
query {
  buscaPorNome(nome: "lula", uf: "br", ano: 2018) {
    nome
    nomeUrna
    bens {
      valor
      descricao
    }
  }
}
```

Resposta

```json
{
  "data": {
    "buscaPorNome": [
      {
        "nome": "LUIZ INACIO LULA DA SILVA",
        "nomeUrna": "LULA",
        "bens": [
          {
            "valor": 5466.9,
            "descricao": "Terreno"
          },
          {
            "valor": 3866.99,
            "descricao": "Caderneta de poupanca"
          },
          ...
```

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

- Instalar dependencias
```bash
npm i
```

- Povoar o banco de dados
```bash
npm run create-db
```

- Iniciar o app

```bash
npm start
```

Em `http://localhost:4000` estara um webapp para fazer queries e o endpoint da api.
