/*
 * Firefox Browser listener to post
 * Chrome Cast actions to HTTP Server
 * within a local network
 *
 * Christopher Apodaca
 * Sept. 12, 2020
 * https://www.christopher-apodaca.com
 * MIT License
 **/

let BUFFERING = 'BUFFERING',
    HOST = 'http://192.168.50.117',
    PLAYING = 'PLAYING',
    PORT = 9898,
    REQ = {};

resetRequestParams();

/**
 * Resets the request Parameters back to their default
 **/
function resetRequestParams() {
	REQ = {
		'url': HOST + ':' + PORT + '/',
		'method': '',
		'timeout': 0,
		'headers': {
			'Content-Type': 'application/json'
		},
		'data': {}
	};
}

/**
 * Issues the HTTP action request to the server
 * @param {string} method - The HTTP method
 * @param {string} action - The Chromecast Action
 * @param {string} data - The address of the media
 */
function sendHTTP(method, action, data) {
		REQ.method = method;
		REQ.url = REQ.url + action;
		REQ.data = JSON.stringify({ "url": data });

		return $.ajax(REQ);
}

/**
 * Resets the settings object and sets the color of the button
 * that was clicked.
 * @param {Object} response - The HTTP response from the server
 * @param {jQuery.Object} action - The button clicked from UI
 */
function resetSettingsAndButtons(response, button) {
	resetRequestParams();

	if (!response) {
		$('.btn').removeClass('btn-success');
	}

	if (response.playerState == BUFFERING || response.playerState == PLAYING) {
		$(button).addClass('btn-success');
	}
};

/**
 * Stops youtube video from tab url
 */
$('#stop').on('click', function(evt) {
	evt.preventDefault();
	let $btn = $(this);
	sendHTTP('POST', 'stop').done(function(response) {
		resetSettingsAndButtons(response, $btn)
	});
});

/**
 * Stops youtube video from tab url
 */
$('#pause').on('click', function(evt) {
	evt.preventDefault();
	let $btn = $(this);
	sendHTTP('POST', 'pause').done(function(response) {
		resetSettingsAndButtons(response, $btn)
	});
});

/**
 * Plays youtube video from tab url
 */
$('#play').on('click', function(evt) {
	evt.preventDefault();
	let $btn = $(this);
	browser.tabs.query({active: true, currentWindow: true}).then(function(tab) {
		let mediaURL = tab[0].url
		sendHTTP('POST', 'play', mediaURL).done(function(response) {
			resetSettingsAndButtons(response, $btn)
		});
	});
});

/**
 * Fetches the current status of the chromecast
 */
$('#status').on('click', function(evt) {
	evt.preventDefault();
	let $btn = $(this);
	sendHTTP('GET', 'status').done(function(response) {
		console.log(response);
		$('#info').text(JSON.stringify(response));
		$('#info').removeClass('hide');
	});
});
