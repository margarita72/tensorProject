'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;
app.use(_express2.default.static(_path2.default.join(__dirname, 'build')));
app.get('/', function (request, response) {
    response.sendFile('./build/index.html', { root: __dirname });
});
app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/" + "./css/main.css");
});
app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log('server is listening on ' + port);
});