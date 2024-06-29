require('dotenv').config();

const express = require('express');
const cors = require('cors');

const port = process.env.PORT
const WhatsAppAPI = require('./modules/Whatsapp');
const router = require('./routes/send');
const { getQrFilePath } = require('./controllers/QrCode');

WhatsAppAPI();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/send", router);

app.get('/view-session-qrcode', async (req, res) => {
    res.sendFile(await getQrFilePath());
});

app.all("/*", (req, res) => {
    res.redirect('https://cttricks.com');
});

app.listen(port, () => {
    console.log(`Goto http://localhost:${port}`);
})