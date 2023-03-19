const functions = require("firebase-functions");
const express = require("express");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const email = req.body;

  if (!email) res.status(400).send("something");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    /* port: 587,
    secure: false, */
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASS,
    },
  });

  let textValue = "";
  textValue += `${email.name} would like a quote for the ${email.product}\n`;
  textValue += `\nEmail: ${email.email}\n`;
  textValue += `Phone Number: ${email.phone}\n`;
  textValue += `\nMessage: ${email.message}`;

  const msg = {
    from: "\"Ronak Kothari\" <noreply@metallurgycollaboration.com>",
    to: "rk.ronakjkothari@gmail.com",
    subject: `New Quote Request - ${email.name}`,
    text: textValue,
  };

  await transporter.sendMail(msg);

  res.status(500).send("No Errors");
});

exports.app = functions.https.onRequest(app);
