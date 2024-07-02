const {
	sessions,
	saveSession,
	getSession,
	updateSessionStatus
} = require('./Session');

const {
	Client,
	LocalAuth
} = require('whatsapp-web.js');

const { saveQrCode } = require('../controllers/QrCode');

const {
	onMessage,
	onACK
} = require('../controllers/whatsapp/events');

//Create Session
const createSession = function (id, description) {

	let cid = id;
	console.log('Creating session: ' + id);

	const client = new Client({
		restartOnAuthFail: true,
		puppeteer: {
			headless: true,
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--no-first-run',
				'--no-zygote',
				'--single-process',
				'--disable-gpu'
			],
		},
		authStrategy: new LocalAuth({
			clientId: id,
			dataPath: "sessions"
		})
	});

	client.initialize();
	console.log('CONNECTING');

	client.on('loading_screen', (percent, message) => {
		console.log('LOADING:' + percent + '%');
	});

	//Generate QR & Save
	client.on('qr', (qr) => {
		updateSessionStatus(cid, 'QR_RECEIVED');
		saveQrCode(qr);
	});

	client.on('ready', async () => {

		const savedSessions = getSession();
		const sessionIndex = savedSessions.findIndex(sess => sess.id == id);
		savedSessions[sessionIndex].ready = true;

		updateSessionStatus(cid, 'CONNECTED & READY TO USE');
		saveSession(savedSessions);

		const version = await client.getWWebVersion();
    	console.log(`WWeb v${version}`);
	});

	client.on('authenticated', () => {
		console.log('AUTHENTICATED');
	});

	client.on('auth_failure', () => {
		console.log('AUTH_FAILED');
	});

	client.on('change_state', (state) => {
		console.log('CHANGE STATE', state);
	});

	client.on('disconnected', (reason) => {

		updateSessionStatus(cid, 'DISCONNECTED');
		client.destroy();

		// Menghapus pada file sessions
		const savedSessions = getSession();
		const sessionIndex = savedSessions.findIndex(sess => sess.id == id);
		savedSessions.splice(sessionIndex, 1);
		saveSession(savedSessions);

	});

	client.on('message_ack', onACK);
	client.on('message', onMessage);

	sessions.push({
		id: id,
		description: description,
		client: client
	});

	const savedSessions = getSession();
	const sessionIndex = savedSessions.findIndex(sess => sess.id == id);

	if (sessionIndex == -1) {

		savedSessions.push({
			id: id,
			description: description,
			ready: false,
		});

		saveSession(savedSessions);
	}
}

const WhatsappAPI = () => {

	console.log('Initializing Whatsapp API Service');

	const savedSessions = getSession();

	if (savedSessions.length > 0) {

		savedSessions.forEach(sess => {
			console.log('Restarting Saved Session | SessionID: ', sess.id);
			createSession(sess.id, sess.description);
		});

	} else {

		const waNumber = process.env.WHATSAPP_NUMBER;
		console.log('Creating New Session - ', waNumber);

		createSession(waNumber, "Version 1.0.2");
	}
}

module.exports = WhatsappAPI