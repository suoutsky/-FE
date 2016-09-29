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
exports.getGiftBag = function (req, res) {
  var url = 'mock/creditgame/getGiftBag.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
exports.ajaxFindItemByName = function (req, res) {
  var url = 'mock/creditgame/coupon.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
exports.gift_delete = function (req, res) {
  var url = 'mock/creditgame/delete.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
exports.gift_save = function (req, res) {
  var url = 'mock/creditgame/delete.json';
  console.log(url);
  fs.readFile(url, function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
};
