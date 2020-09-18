/**
 * HTTP API to forward chromecast commands
 * within a local Network
 *
 * Christopher Apodaca
 * Sept. 12, 2020
 * https://www.christopher-apodaca.com
 * MIT License
 */

const express = require('express');
const PORT = 9898;
const server = express();
const ChromecastAPI = require('chromecast-api');
const client = new ChromecastAPI();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let DEVICE;
let STATUS;

/**
 * POST: /play
 * Play media from url: req.body.mediaURL
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.post('/play', async (req, res) => {
	const params = req.body;

	DEVICE.play(params.url, function(err) {
		if (err) console.log(err);

		// Buffering takes time
		setTimeout(() => {
			DEVICE.player.getStatus(function(err, stat) {
				STATUS = stat;
				console.log(STATUS);
				res.status(200).send(STATUS);
			});
		}, 5000);

	});
});

/**
 * POST: /stop
 * Stop current media
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.post('/stop', (req, res) => {
	if (!DEVICE || typeof STATUS === 'undefined' || !STATUS) {
		res.status(200).send(STATUS);
		return;
	}

	DEVICE.stop(function(err) {
		if (err) console.log(err);
		DEVICE.player.getStatus(function(err, stat) {
			STATUS = stat;
			res.status(200).send(STATUS);
		});
	});
});

/**
 * POST: /pause
 * Pause current media
 * @params {Object} req - request from client
 * @params {Object} res - response to client
*/
app.post('/pause', (req, res) => {
	if (!DEVICE || typeof STATUS === 'undefined' || !STATUS) {
		res.status(200).send(STATUS);
		return;
	}

	DEVICE.pause(function(err) {
		if (err) console.log(err);
		DEVICE.player.getStatus(function(err, stat) {
			STATUS = stat;
			res.status(200).send(STATUS);
		});
	});
});

/**
 * POST: /resume
 * Resume current media
 * @params {Object} req - request from client
 * @params {Object} res - response to client
*/
app.post('/resume', (req, res) => {
	DEVICE.resume(function(err) {
		if (err) console.log(err);
		DEVICE.player.getStatus(function(err, stat) {
			STATUS = stat;
			res.status(200).send(STATUS);
		});
	});
});

/**
 * GET: /status
 * Stop current media
 * @params {Object} req - request from client
 * @params {Object} res - response to client
*/
app.get('/status', (req, res) => {
	res.status(200).send(STATUS);
});

/**
 * POST: /update
 * Trigger the mDNS and SSDP search again.
 * Warning: the device event will trigger again
 * (it might return the same device).
 * @params {Object} req - request from client
 * @params {Object} res - response to client
*/
app.post('/update', (req, res) => {
	client.update();
	res.status(200).send('Success: ' + JSON.stringify(client.devices));
});

/**
 * POST: /close
 * Close the connection with the device.
 * @params {Object} req - request from client
 * @params {Object} res - response to client
*/
app.post('/close', (req, res) => {
	DEVICE.close(function(err) {
		if (err) console.log(err);
		DEVICE.player.getStatus(function(err, stat) {
			STATUS = stat;
			res.status(200).send(STATUS);
		});
	});
});

/**
 * GET: /
 * Establish PING PONG
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.get('/', (req, res) => {
	res.status(200).send('Success: Firecast up on ' + PORT + '!');
});

// Start the server
app.listen(PORT, () => {
	console.log('Firecast up on ' + PORT + '!');
});

/**
 * Setup Event Listeners
 * Store Global DEVICE.STATUS
 */
client.on('device', function (device) {
	DEVICE = device;
	console.log('Found chromecast: `' + DEVICE.friendlyName + '` at ' + DEVICE.host)

	/**
	 * Event emitted when the client is
	 * connected to the device.
	 */
	DEVICE.on('connected', function(stats) {
		STATUS = stats;
	});

/**
 * Event emitted when the device
 * has a new status: callback(status).
 */
	DEVICE.on('status', function(stats) {
		STATUS = stats;
	});

});
