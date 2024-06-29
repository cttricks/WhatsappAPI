const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

const QR_FILE = path.join(__dirname, '..', 'images', 'whatsapp-qrcoode.png');
const SAMPLE_FILE = path.join(__dirname, '..', 'images', 'sample.png');

const saveQrCode = (qr) => {

    console.log('Saving Qr | Path: ', QR_FILE);

    qrcode.toDataURL(qr, (err, base64String) => {

        if (err) {
            console.log('An rrror occurred while generating qrcode.png file', err);
            return;
        }

        const base64Data = base64String.replace(/^data:image\/png;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        fs.writeFile(QR_FILE, buffer, (err) => {
            if (err) {
                console.error('An error occurred while saving the image:', err);
            } else {
                console.log('Image saved successfully');
            }
        });

    });
};

const getQrFilePath = () => {
    if (fs.existsSync(QR_FILE)) {
        return QR_FILE;
    } else {
        console.warn('QR code image file does not exist, returning sample image');
        return SAMPLE_FILE;
    }
};

module.exports = {
    saveQrCode,
    getQrFilePath
};
