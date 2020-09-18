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

function playYoutubeTab() {
	browser.tabs.query({active: true}).then(function(tab) {
		let URL = tab[0].url
		let HOST = "http://192.168.50.117:9898/play"

		var settings = {
			"url": HOST,
			"method": "POST",
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

browser.browserAction.onClicked.addListener(playYoutubeTab);
