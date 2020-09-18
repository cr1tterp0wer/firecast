/**
 * REST API to forward chromecast commands
 * Christopher Apodaca
 */

const express = require('express');
const PORT = 9898;
const server = express();
const ChromecastAPI = require('chromecast-api');
const client = new ChromecastAPI();
const app = express();
app.use(express.json());

/**
 * POST: /play
 * Play media from url: req.body.mediaURL
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.post('/play', (req, res) => {
	const device = client.devices[0];
	const params = req.body;

	if (params.url) {
		device.play(params.url, function(err) {
			if (err) console.log(err);
		});
	}

	res.status(200).send('Success');
});

/**
 * POST: /stop
 * Stop current media
 */
app.post('/stop', (req, res) => {
	const device = client.devices[0];

	device.stop();
	res.status(200).send('Success');
});

/**
 * POST: /pause
 * Pause current media
 */
app.post('/pause', (req, res) => {
	const device = client.devices[0];

	device.pause();
	res.status(200).send('Success');
});

/**
 * POST: /resume
 * Resume current media
 */
app.post('/resume', (req, res) => {
	const device = client.devices[0];

	device.resume();
	res.status(200).send('Success');
});

/**
 * GET: /
 * Establish PING PONG
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.get('/', (req, res) => {
	res.status(200).send('Success');
});

app.listen(PORT, () => {
	console.log('Firecast up on ' + PORT + '!');
});
