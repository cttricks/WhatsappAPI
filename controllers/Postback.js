require('dotenv').config();

const axios = require('axios');
const PostbackURL = process.env.CALLBACK_URL;

function SendPostback(data) {
    if (!PostbackURL || PostbackURL.length < 5) {
        console.error("Invalid Postback URL", PostbackURL);
        return;
    }

    axios.post(PostbackURL, data)
        .then(response => {
            console.log("Postback sent successfully");
        })
        .catch(error => {
            console.error("Error occurred while sending end user postback", error);
        });
}

module.exports = SendPostback;