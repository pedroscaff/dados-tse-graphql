const eleicao2014 = {}
eleicao2014.ano = 2014
eleicao2014.extension = 'txt'
eleicao2014.bensCandidato = {}
eleicao2014.bensCandidato.headers = [
  'DATA_GERACAO',
  'HORA_GERACAO',
  'ANO_ELEICAO',
  'DESCRICAO_ELEICAO',
  'SIGLA_UF',
  'SQ_CANDIDATO',
  'CD_TIPO_BEM_CANDIDATO',
  'DS_TIPO_BEM_CANDIDATO',
  'DETALHE_BEM',
  'VALOR_BEM',
  'DATA_ULTIMA_ATUALIZACAO',
  'HORA_ULTIMA_ATUALIZACAO'
]

eleicao2014.bensCandidato.map = new Map([
  ['SQ_CANDIDATO', 'id'],
  ['CD_TIPO_BEM_CANDIDATO', 'codigo'],
  ['DS_TIPO_BEM_CANDIDATO', 'descricao'],
  ['DETALHE_BEM', 'detalhe'],
  ['VALOR_BEM', 'valor']
])

eleicao2014.consultaCandidato = {}
eleicao2014.consultaCandidato.headers = [
  'DATA_GERACAO',
  'HORA_GERACAO',
  'ANO_ELEICAO',
  'NUM_TURNO',
  'DESCRICAO_ELEICAO',
  'SIGLA_UF',
  'SIGLA_UE',
  'DESCRICAO_UE',
  'CODIGO_CARGO',
  'DESCRICAO_CARGO',
  'NOME_CANDIDATO',
  'SEQUENCIAL_CANDIDATO',
  'NUMERO_CANDIDATO',
  'CPF_CANDIDATO',
  'NOME_URNA_CANDIDATO',
  'COD_SITUACAO_CANDIDATURA',
  'DES_SITUACAO_CANDIDATURA',
  'NUMERO_PARTIDO',
  'SIGLA_PARTIDO',
  'NOME_PARTIDO',
  'CODIGO_LEGENDA',
  'SIGLA_LEGENDA',
  'COMPOSICAO_LEGENDA',
  'NOME_LEGENDA',
  'CODIGO_OCUPACAO',
  'DESCRICAO_OCUPACAO',
  'DATA_NASCIMENTO',
  'NUM_TITULO_ELEITORAL_CANDIDATO',
  'IDADE_DATA_ELEICAO',
  'CODIGO_SEXO',
  'DESCRICAO_SEXO',
  'COD_GRAU_INSTRUCAO',
  'DESCRICAO_GRAU_INSTRUCAO',
  'CODIGO_ESTADO_CIVIL',
  'DESCRICAO_ESTADO_CIVIL',
  'CODIGO_COR_RACA',
  'DESCRICAO_COR_RACA',
  'CODIGO_NACIONALIDADE',
  'DESCRICAO_NACIONALIDADE',
  'SIGLA_UF_NASCIMENTO',
  'CODIGO_MUNICIPIO_NASCIMENTO',
  'NOME_MUNICIPIO_NASCIMENTO',
  'DESPESA_MAX_CAMPANHA',
  'COD_SIT_TOT_TURNO',
  'DESC_SIT_TOT_TURNO',
  'NM_EMAIL'
]

eleicao2014.consultaCandidato.map = new Map([
  ['ANO_ELEICAO', 'anoEleicao'],
  ['CODIGO_CARGO', 'codigoCargo'],
  ['DESCRICAO_CARGO', 'descricaoCargo'],
  ['NOME_CANDIDATO', 'nome'],
  ['SEQUENCIAL_CANDIDATO', 'id'],
  ['NUMERO_CANDIDATO', 'numeroCandidato'],
  ['CPF_CANDIDATO', 'cpf'],
  ['NOME_URNA_CANDIDATO', 'nomeUrna'],
  ['COD_SITUACAO_CANDIDATURA', 'codigoSituacaoCandidatura'],
  ['DES_SITUACAO_CANDIDATURA', 'situacaoCandidatura'],
  ['NUMERO_PARTIDO', 'numeroPartido'],
  ['SIGLA_PARTIDO', 'siglaPartido'],
  ['NOME_PARTIDO', 'nomePartido'],
  ['CODIGO_LEGENDA', 'codigoLegenda'],
  ['SIGLA_LEGENDA', 'siglaLegenda'],
  ['COMPOSICAO_LEGENDA', 'composicaoLegenda'],
  ['NOME_LEGENDA', 'nomeLegenda'],
  ['CODIGO_OCUPACAO', 'codigoOcupacao'],
  ['DESCRICAO_OCUPACAO', 'ocupacao'],
  ['DATA_NASCIMENTO', 'dataNascimento'],
  ['IDADE_DATA_ELEICAO', 'idadeEleicao'],
  ['CODIGO_SEXO', 'codigoSexo'],
  ['DESCRICAO_SEXO', 'sexo'],
  ['COD_GRAU_INSTRUCAO', 'codigoGrauInstrucao'],
  ['DESCRICAO_GRAU_INSTRUCAO', 'grauInstrucao'],
  ['CODIGO_ESTADO_CIVIL', 'codigoEstadoCivil'],
  ['DESCRICAO_ESTADO_CIVIL', 'descricaoEstadoCivil'],
  ['CODIGO_COR_RACA', 'codigoRaca'],
  ['DESCRICAO_COR_RACA', 'raca'],
  ['CODIGO_NACIONALIDADE', 'codigoNacionalidade'],
  ['DESCRICAO_NACIONALIDADE', 'nacionalidade'],
  ['SIGLA_UF_NASCIMENTO', 'ufNascimento'],
  ['NOME_MUNICIPIO_NASCIMENTO', 'municipioNascimento'],
  ['DESPESA_MAX_CAMPANHA', 'despesaMaxCampanha'],
  ['COD_SIT_TOT_TURNO', 'codigoResultado'],
  ['DESC_SIT_TOT_TURNO', 'resultado'],
  ['NM_EMAIL', 'email']
])

const eleicao2018 = {}
eleicao2018.ano = 2018
eleicao2018.extension = 'csv'
eleicao2018.bensCandidato = {}
eleicao2018.bensCandidato.headers = true
eleicao2018.bensCandidato.map = new Map([
  ['SQ_CANDIDATO', 'id'],
  ['CD_TIPO_BEM_CANDIDATO', 'codigo'],
  ['DS_TIPO_BEM_CANDIDATO', 'descricao'],
  ['DS_BEM_CANDIDATO', 'detalhe'],
  ['VR_BEM_CANDIDATO', 'valor']
])
eleicao2018.consultaCandidato = {}
eleicao2018.consultaCandidato.headers = true
eleicao2018.consultaCandidato.map = new Map([
  ['ANO_ELEICAO', 'anoEleicao'],
  ['CD_CARGO', 'codigoCargo'],
  ['DS_CARGO', 'descricaoCargo'],
  ['NM_CANDIDATO', 'nome'],
  ['SQ_CANDIDATO', 'id'],
  ['NR_CANDIDATO', 'numeroCandidato'],
  ['CPF_CANDIDATO', 'cpf'],
  ['NM_URNA_CANDIDATO', 'nomeUrna'],
  ['COD_SITUACAO_CANDIDATURA', 'codigoSituacaoCandidatura'],
  ['DES_SITUACAO_CANDIDATURA', 'situacaoCandidatura'],
  ['NM_PARTIDO', 'numeroPartido'],
  ['SG_PARTIDO', 'siglaPartido'],
  ['NM_PARTIDO', 'nomePartido'],
  ['SQ_COLIGACAO', 'codigoLegenda'],
  ['SG_LEGENDA', 'siglaLegenda'],
  ['DS_COMPOSICAO_COLIGACAO', 'composicaoLegenda'],
  ['NM_COLIGACAO', 'nomeLegenda'],
  ['CD_OCUPACAO', 'codigoOcupacao'],
  ['DS_OCUPACAO', 'ocupacao'],
  ['DT_NASCIMENTO', 'dataNascimento'],
  ['NR_IDADE_DATA_POSSE', 'idadeEleicao'],
  ['CD_SEXO', 'codigoSexo'],
  ['DS_SEXO', 'sexo'],
  ['COD_GRAU_INSTRUCAO', 'codigoGrauInstrucao'],
  ['DS_GRAU_INSTRUCAO', 'grauInstrucao'],
  ['CD_ESTADO_CIVIL', 'codigoEstadoCivil'],
  ['DS_ESTADO_CIVIL', 'descricaoEstadoCivil'],
  ['CD_COR_RACA', 'codigoRaca'],
  ['DS_COR_RACA', 'raca'],
  ['CD_NACIONALIDADE', 'codigoNacionalidade'],
  ['DS_NACIONALIDADE', 'nacionalidade'],
  ['SG_UF_NASCIMENTO', 'ufNascimento'],
  ['NM_MUNICIPIO_NASCIMENTO', 'municipioNascimento'],
  ['DESPESA_MAX_CAMPANHA', 'despesaMaxCampanha'],
  ['COD_SIT_TOT_TURNO', 'codigoResultado'],
  ['DESC_SIT_TOT_TURNO', 'resultado'],
  ['NM_EMAIL', 'email']
])

module.exports = [
  eleicao2014,
  eleicao2018
]
