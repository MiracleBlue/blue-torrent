var fs     = require('fs');
var path   = require('path');
var RSVP   = require('rsvp');
var wrench = require('wrench');
var glob = require("glob-promise");
var fsJson = require("fs-json")();

var denodeify = RSVP.denodeify;
var readFile  = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);
var loadJson = denodeify(fsJson.load);

var datastorePath = path.resolve(__dirname, "../datastore/");
var testTorrentPath = path.resolve(__dirname, "../test-torrents/Ubuntu_14.04.3_server_amd64.torrent");

// todo: remove this call as this is just for testing!
exports.readTorrentFile = function(torrentPath) {
  if (!torrentPath) return console.error("No torrent path was provided");
  console.log("readTorrentFile", torrentPath);
  return readFile(torrentPath);
};

exports.getDownloadPath = path.resolve(__dirname, "../test-downloads/");

exports.readFile = function(filename) {
  var filePath = path.resolve(__dirname, filename);
  console.log("filePath", filePath);
  return loadJson(filePath);
};

exports.getAllFiles = function(typeName) {
  var storeDirectory = datastorePath + "/" + typeName + "/";
  console.log("storeDirectory", storeDirectory);

  var files = glob( "*.json", {
    cwd: storeDirectory
  }).then(function(output) {
    return RSVP.all(output.map(function(fileName) {
      var filePath = path.resolve(storeDirectory, fileName);
      return loadJson(filePath).then(function(file) {
        return file[typeName];
      });
    }));
  });

  return files;
};

exports.writeFile = function(filename, data) {
  var dirname = path.dirname(filename);
  if (!fs.existsSync(dirname)) {
    wrench.mkdirSyncRecursive(dirname, 0x1ff);
  }
  return writeFile(filename, data);
};
