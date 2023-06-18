const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jts.msantos@gmail.com",
    pass: "fppqgpadahmgnkcj",
  },
});

// Fazer a requisição GET do site da CPTM
const url = "https://www.cptm.sp.gov.br/Pages/Home.aspx";
axios
  .get(url)
  .then((response) => {
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

    let mailOptions = {
      from: "jts.msantos@gmail.com",
      to: "contato.vieiraaline@gmail.com; jts.msantos@gmail.com",
      subject: "Status - CPTM ",
      text: text,
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Status CPTM</title>
        </head>
        <body>
          <div>
            ${text}

            <br/>

            <p>${dataAtualizacao}</p>

          </div>
        </body>
      </html>

      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          "Email enviado com sucesso! ID da mensagem: ",
          info.messageId
        );
      }
    });

    console.log(list);
  })
  .catch((error) => {
    console.log(error);
  });
