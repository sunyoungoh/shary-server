var express = require('express'),
    routes = express.Router();
var passport = require('passport');

var map = require('./../controller/map-controller');

//장소 검색
routes.get('/', map.getMap);

module.exports = routes;