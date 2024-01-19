
const fs = require('fs');

// a) Ler os arquivos JSON
function lerArquivo(nomeArquivo) {
  try {
    const conteudo = fs.readFileSync('Database/'+ nomeArquivo, 'utf-8');
    return JSON.parse(conteudo);
  } catch (erro) {
    console.error(`Erro ao ler o arquivo ${nomeArquivo}: ${erro.message}`);
    return null;
  }
}

const database1 = lerArquivo('broken_database_1.json');
const database2 = lerArquivo('broken_database_2.json');

// b) Corrigir nomes de marca e veículo
function corrigirNomes(database) {
  const regexA = /æ/g;
  const regexO = /ø/g;

  for (const entrada of database) {
    if (entrada.marca) {
      entrada.marca = entrada.marca.replace(regexA, 'a').replace(regexO, 'o');
    }
    if (entrada.nome) {
      entrada.nome = entrada.nome.replace(regexA, 'a').replace(regexO, 'o');
    }
  }
}


corrigirNomes(database1);
corrigirNomes(database2);

// c) Corrigir vendas
function corrigirVendas(database) {
  for (const entrada of database) {
    entrada.vendas = Number(entrada.vendas);
  }
}

corrigirVendas(database1);
corrigirVendas(database2);

// d) Exportar um arquivo JSON com o banco corrigido
function exportarArquivo(nomeArquivo, database) {
  try {
    const conteudo = JSON.stringify(database, null, 2);
    fs.writeFileSync(nomeArquivo, conteudo, 'utf-8');
    console.log(`Arquivo ${nomeArquivo} exportado com sucesso.`);
  } catch (erro) {
    console.error(`Erro ao exportar o arquivo ${nomeArquivo}: ${erro.message}`);
  }
}

exportarArquivo('corrigido_database_1.json', database1);
exportarArquivo('corrigido_database_2.json', database2);
