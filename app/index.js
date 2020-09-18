
function start() {
	let url;
	browser.tabs.query({active: true}).then(function(t) {
		console.log(t[0].url);
	});
	console.log($);
}

browser.browserAction.onClicked.addListener(start);
