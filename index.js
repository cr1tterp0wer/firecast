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

/**
 * POST: /play
 * Play media from url: req.body.mediaURL
 * @params {Object} req - request from client
 * @params {Object} res - response to client
 */
app.post('/play', (req, res) => {
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
