import express from "express";

import dotenv from "dotenv";
dotenv.config();

import sendMail from "./email.service.js";
import getCPTMStatus from "./cptm.service.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/cptm-status", (req, res) => {
  getCPTMStatus(res).then(
    (data) => {
      try {
        sendMail(data.text, data.dataAtualizacao);
        res.send("Ok");
      } catch (error) {
        console.log(error);
        res.send({ message: "Erro ao enviar o e-mail", error });
      }
    },
    (error) => {
      console.log(error);
      res.send({ message: "Erro ao recuperar os dados da CPTM", error });
    }
  );
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
