/**
 * Created by Anthony on 2016/8/19.
 */

var fs = require('fs');

exports.img = function (req, res) {
  var url = 'mock/creditgame/img.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
exports.query = function (req, res) {
  var url = 'mock/creditgame/query.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
exports.save = function (req, res) {
  var url = 'mock/creditgame/save.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
