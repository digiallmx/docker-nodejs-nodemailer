const express = require("express");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/mail", async (req, res) => {
  const { body } = req;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"${body.fromName} 🤠" ${body.fromEmail}`, // sender address
      to: body.to, // list of receivers
      subject: body.subject, // Subject line
      text: body.text, // plain text body
      html: body.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.status(200).json({ message: "Mail sended" });
  } catch (exception) {
    res.status(500).json({ error: exception.toString() });
  }
});

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});
