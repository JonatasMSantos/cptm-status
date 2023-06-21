import express from "express";

const app = express();
const port = 3000;
import sendMail from "./email.service.js";
import getCPTMStatus from "./cptm.service.js";

app.get("/cptm-status", (req, res) => {
  getCPTMStatus(res).then(
    (data) => {
      try {
        sendMail(data.text, data.dataAtualizacao);
        res.statusCode("200").send("Ok");
      } catch (error) {
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
  console.log(`Example app listening on port ${port}`);
});
