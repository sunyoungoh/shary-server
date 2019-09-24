var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var searchController = require('../controller/search-controller');

// 카테고리별리뷰 검색
routes.get('/:category/:term', searchController.getSearchReview);

// 태그로 검색
routes.get('/tag/:category/:term', searchController.getSearchTag);

// 리뷰뷱 안에서 검색
routes.get('/:category/:id/:term', searchController.getSearchInReviewbook);

module.exports = routes;