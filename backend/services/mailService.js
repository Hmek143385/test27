// Service pour envoyer un email (exemple avec nodemailer)
const nodemailer = require('nodemailer');

exports.sendMail = async ({ to, subject, text }) => {
  // Configurer le transporteur selon l'utilisateur connecté
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text });
};