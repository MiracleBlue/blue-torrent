# Blue-torrent

This is just a pet project to create a simple bit torrent client that doesn't suck, and that works cross-platform.
This may not become anything usable, so please don't download it unless you're a developer that wants to contribute.

It uses Node Webkit (NW) to run in its own window and have access to the host system for file access etc.  Please read
the Running / Development instructions.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/MiracleBlue/blue-torrent.git` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember nw` - runs in a Webkit instance via NW

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember nw:test`
* `ember nw:test --server`

### Building

* `ember nw:package` (development)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* [ember-cli-node-webkit](https://github.com/brzpegasus/ember-cli-nwjs)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

