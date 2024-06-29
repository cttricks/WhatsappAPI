require('dotenv').config();

const fs = require('fs');
const SendPostback = require('../controllers/Postback');
const SESSIONS_FILE = process.env.SESSIONS_FILE;

const sessions = [];

//Create Session File If Not Available
if (!fs.existsSync(SESSIONS_FILE)) {
    try {
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify([]));
        console.log('Sessions file created successfully.');
    } catch (err) {
        console.warn('Failed to create sessions file', err);
    }
}

//Handel Session Evnets
const saveSession = (sessions) => {
	fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions), function (err) {
		if (err) {
			console.warn('Failed to setSessionsFile',err);
		}
	});
}

const getSession = () => {
	return JSON.parse(fs.readFileSync(SESSIONS_FILE));
}

const updateSessionStatus = (session, status) => {

    console.log('STATUS - ', session , status);

	SendPostback({
		"client_id": session,
		"event": "server_status",
		"message": status
	});

}

module.exports = {
    sessions,
    saveSession,
    getSession,
    updateSessionStatus
};