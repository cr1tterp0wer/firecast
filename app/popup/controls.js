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

let PORT = 9898;

/**
 * Issues the HTTP action request to the server
 * @param {string} method - The HTTP method
 * @param {string} action - The Chromecast Action
 * @param {string} host - The address of the server
 */
function sendHTTP(method, action, host, port) {
	browser.tabs.query({active: true, currentWindow: true}).then(function(tab) {
		let URL = tab[0].url
		let HOST = host + ":" + port + '/' + action;

		var settings = {
			"url": HOST,
			"method": method,
			"timeout": 0,
			"headers": {
				"Content-Type": "application/json"
			},
			"data": JSON.stringify({"url": URL}),
		};

		$.ajax(settings).done(function (response) {
			console.log(response);
		});
	});
}

/**
 * Stops youtube video from tab url
 */
$('#stop').on('click', function(evt) {
	sendHTTP('POST', 'stop', 'http://192.168.50.117', PORT);
});

/**
 * Stops youtube video from tab url
 */
$('#pause').on('click', function(evt) {
	sendHTTP('POST', 'pause', 'http://192.168.50.117', PORT);
});

/**
 * Plays youtube video from tab url
 */
$('#play').on('click', function(evt) {
	sendHTTP('POST', 'play', 'http://192.168.50.117', PORT);
});
