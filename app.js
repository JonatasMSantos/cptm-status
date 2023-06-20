const express = require("express");
const app = express();
const port = 3000;
import getCPTMStatus from "./cptm.service";
import sendMail from "./email.service";
require("dotenv").config();

app.get("/", (req, res) => {
  getCPTMStatus(res).then(
    (data) => {
      try {
        sendMail(data.text, data.dataAtualizacao);
      } catch (error) {
        res.send({ message: "Erro ao enviar o e-mail", error });
      }
    },
    (error) => {
      res.send({ message: "Erro ao recuperar os dados da CPTM", error });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
