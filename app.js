const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

app.use(bodyParser.json());

const credential = {
  host: process.env.HOST,
  port: process.env.PORT,
  user:process.env.USER,
  pass:process.env.PASS
}
const transporter = nodemailer.createTransport({
  host: credential.host,
  port: credential.port,
  secure: true,
  auth: {
    user: credential.user,
    pass: credential.pass,
  },
});

app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  // Pengaturan email yang akan dikirim
  const mailOptions = {
    from: 'Connectify <admin@luki.my.id>', 
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Gagal mengirim email');
    } else {
      console.log('Email terkirim: ' + info.response);
      res.status(200).send('Email terkirim');
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
