import axios from "axios";
import cheerio from "cheerio";

const url = "https://www.cptm.sp.gov.br/Pages/Home.aspx";

export default async function getCPTMStatus() {
  let response = await axios.get(url);

  // Analisar o HTML da página com o Cheerio
  const $ = cheerio.load(response.data);

  // Selecionar as divs com o caminho especificado
  const nomes = $(
    "#destaques > div.container > div.col-sm-12.col-md-8.situacao_linhas.situacao_linhas span.nome_linha"
  );

  const status = $(
    "#destaques > div.container > div.col-sm-12.col-md-8.situacao_linhas.situacao_linhas span:nth-child(2n)"
  );

  const atualizadoEm = $(
    "#destaques > div.container > div.col-sm-12.col-md-8.situacao_linhas > div > div.col-sm-12.col-md-12 > div.col-xs-12.col-sm-12.col-md-6 > div.ultima_atualizacao"
  );

  let list = [];
  // Fazer um loop pelo conteúdo de cada div
  nomes.each((i, nome) => {
    let o = {};
    o["name"] = $(nome).text();

    status.each((j, status) => {
      if (j == i) {
        o.status = $(status).text();
      }
      //list.push($(div).text());
    });

    list.push(o);
  });

  let dataAtualizacao = "";

  atualizadoEm.each((i, atualizadoEm) => {
    dataAtualizacao = $(atualizadoEm).text();
  });

  let text = "";

  list.forEach((element) => {
    text += `<p> Linha: ${element.name} <br/>`;
    text += `<br/> Status: ${element.status}</p><br/>`;
  });

  return { text, dataAtualizacao };
}
