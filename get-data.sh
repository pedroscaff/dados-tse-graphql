#!/usr/bin/env bash

mkdir -p data
cd data

# curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2014.zip -L -O
# curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_legendas/consulta_legendas_2014.zip -L -O
curl http://agencia.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_2014.zip -L -O
curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2014.zip -L -O

# unzip consulta_vagas_2014.zip -d consulta_vagas_2014
# unzip consulta_legendas_2014.zip -d consulta_legendas_2014
unzip bem_candidato_2014.zip -d bem_candidato_2014
unzip consulta_cand_2014.zip -d consulta_cand_2014

dir=$(pwd)
for f in $dir/consulta_cand_2014/*.txt
do
	filename=$(basename "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"
	iconv -f Latin1 -t UTF8 $f > "$dir/consulta_cand_2014/utf-8-$filename.$extension"
done

for f in $dir/bem_candidato_2014/*.txt
do
	filename=$(basename "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"
	iconv -f Latin1 -t UTF8 $f > "$dir/bem_candidato_2014/utf-8-$filename.$extension"
done

# curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2018.zip -L -O
# curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_legendas/consulta_legendas_2018.zip -L -O
curl http://agencia.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_2018.zip -L -O
curl http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2018.zip -L -O

# unzip consulta_vagas_2018.zip -d consulta_vagas_2018
# unzip consulta_legendas_2018.zip -d consulta_legendas_2018
unzip bem_candidato_2018.zip -d bem_candidato_2018
unzip consulta_cand_2018.zip -d consulta_cand_2018

for f in $dir/consulta_cand_2018/*.csv
do
	filename=$(basename "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"
	iconv -f Latin1 -t UTF8 $f > "$dir/consulta_cand_2018/utf-8-$filename.$extension"
done

for f in $dir/bem_candidato_2018/*.csv
do
	filename=$(basename "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"
	iconv -f Latin1 -t UTF8 $f > "$dir/bem_candidato_2018/utf-8-$filename.$extension"
done

cd ../
