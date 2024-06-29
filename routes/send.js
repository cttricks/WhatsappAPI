const express = require('express');
const router = express.Router();
const sendMessage = require('../controllers/whatsapp/message');

router
    .post("/message", async (req, res) => {
        const response = await sendMessage(req);
        res.status(200).json(response);
    })
    .all("/*", (req, res) => {
        res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        });
    });

module.exports = router;