const express = require('express');
const nodemailer = require('nodemailer');

require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(express.json());

app.post('/email', async (req, res) => {
    const email = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        /*port: 587,
        secure: false,*/
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASS
        }
    });

    const msg = {
        from: '"Ronak Kothari" <noreply@metallurgycollaboration.com>',
        to: "rk.ronakjkothari@gmail.com",
        subject: `New Quote Request - ${email.name}`,
        text: `${email.name} would like a quote for the ${email.product}\n\nEmail: ${email.email}\nPhone Number: ${email.phone}\n\nMessage: ${email.message}`
    }

    const info = await transporter.sendMail(msg);

    res.status(500).send("Email Sent Boys");
})

app.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);