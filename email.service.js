const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default function sendMail(text, dataAtualizacao) {
  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TO,
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

  try {
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
  } catch (error) {}
}
