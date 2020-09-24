

[![N|Solid](https://www.christopher-apodaca.com/assets/logo-2-937a01074396fcd6af22018f1e8fd3d01d77e052a0678842a76bd32405f68d8d.svg)](https://www.christopher-apodaca.com/)
# Firecast
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/cr1tterp0wer/firecast/)

Firecast is a firefox addon that enables Chromecast support by sending REST requests to a small API.

  - Install the Server on your network (putting it on a raspi, or the same machine)
  - Navigate to a youtube video
  - Click the chromecast icon after enabling the addon
  - Magic

# New Features!

  - Icon colors change to display current video status
  - Info button now displays the chromecast's current status

### Tech

Firecast uses a number of open source projects to work properly:

* [chromecast-api] - The chromecast npm api!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Breakdance](https://breakdance.github.io/breakdance/) - HTML to Markdown converter
* [jQuery] - 

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Firecast requires [Node.js](https://nodejs.org/) v4+ to run as a server for the Firecast addon to find the local chromecast device.

Install the dependencies and devDependencies and start the server.

```sh
$ cd firecast
$ npm install
$ node index.js
```
Change the addon server to point to your server
```sh
$ open firecast/app/popup/controls.js 
//LINE 13
let BUFFERING = 'BUFFERING',
    HOST = 'http://192.168.50.117', //Change to your server running node.js (localhost works too)
    PLAYING = 'PLAYING',
    PORT = 9898,
    REQ = {};
```
Install the addon after making the change by navigating to: about:debugging > install addon from file > firecast/app/manifest.json


### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| GitHub | [plugins/github/README.md][PlGh] |


### Development

Want to contribute? Great!

Firecast uses chromecast-api and Nodejs for fast developing.

### Todos

 - Create input to configure the server address in addon popup

License
----

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/cr1tterp0wer/firecast.git>
   [node.js]: <http://nodejs.org>
   [chromecast-api]: <https://www.npmjs.com/package/chromecast-api/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
