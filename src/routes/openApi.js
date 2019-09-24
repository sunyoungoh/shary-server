var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var searchController = require('../controller/openApi-controller');

// 네이버 검색 Open API 책
routes.get('/book/:term', searchController.getBookData);

// itunes 노래 검색
routes.get('/music/:term', searchController.getMusicData);

//TheMovieDB movie 검색 API
routes.get('/movie/:title', searchController.getMovieData);

//TheMovieDB 출현진
routes.get('/movie/:id/credits', searchController.getCredits);

//TheMovieDB TV 검색 API
routes.get('/tv/:title',searchController.getTvData);




module.exports = routes;