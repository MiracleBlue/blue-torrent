var fs     = require('fs');
var path   = require('path');
var RSVP   = require('rsvp');
var wrench = require('wrench');
var glob = require("glob-promise");
var fsJson = require("fs-json")();
var osenv = require("osenv");

var denodeify = RSVP.denodeify;
var readFile  = denodeify(fs.readFile);
var fsWriteFile = denodeify(fs.writeFile);
var loadJson = denodeify(fsJson.load);
var fsWriteJson = denodeify(fsJson.save);

var writeFile = function(filePath, data) {
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    wrench.mkdirSyncRecursive(dirname, 0x1ff);
  }

  return fsWriteFile(filePath, data);
};

var writeJson = function(filePath, data) {
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    wrench.mkdirSyncRecursive(dirname, 0x1ff);
  }

  return fsWriteJson(filePath, data);
};

var datastorePath = path.resolve(__dirname, "../datastore/");
// /Users/MiracleBlue/DevelopmentLocal/blue-torrent/public/test-torrents/ubuntu-15.04-server-amd64.iso.torrent
var testTorrentPath = path.resolve(__dirname, "../test-torrents/ubuntu-15.04-server-amd64.iso.torrent");

var settingsRecordPath = path.resolve(datastorePath, "settings/1.json");

// todo: remove this call as this is just for testing!
exports.readTorrentFile = function(torrentPath) {
  if (!torrentPath) return console.error("No torrent path was provided");
  console.log("readTorrentFile", torrentPath);
  return readFile(torrentPath);
};

exports.homePath = osenv.home();

exports.getDownloadPath = path.resolve(osenv.home(), "test-downloads/");

exports.readFile = function(filename) {
  var filePath = path.resolve(__dirname, filename);

  return loadJson(filePath);
};

exports.getRecord = function(modelName, id) {
  var storeDirectory = datastorePath + "/" + modelName;
  var filePath = storeDirectory + "/" + id + ".json";

  return loadJson(filePath);
};

exports.createRecord = function(modelName, record) {
  var storeDirectory = datastorePath + "/" + modelName;
  var filePath = storeDirectory + "/" + record.id + ".json";

  return writeJson(filePath, record);
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
  return writeFile(filename, data);
};

exports.readSettings = function() {
  return loadJson(settingsRecordPath);
};

exports.writeSettings = function(record) {
  return writeJson(settingsRecordPath, record);
};
