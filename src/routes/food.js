var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var foodController = require('./../controller/food-controller');
var map = require('./../controller/map-controller');




// 새 리뷰 등록
routes.post('/', passport.authenticate('jwt', {
    session: false
}), foodController.writeReview);

// 리뷰 수정
routes.patch('/:id', passport.authenticate('jwt', {
    session: false
}), foodController.editReview);

// 책 리뷰 삭제
routes.delete('/:id', passport.authenticate('jwt', {
    session: false
}), foodController.deleteReview);

// 책 리뷰 리스트 가져오기
routes.get('/:id', passport.authenticate('jwt', {
    session: false
}), foodController.getReviewList);


// 책 리뷰 디테일 가져오기
routes.get('/detail/:id', passport.authenticate('jwt', {
    session: false
}), foodController.getReviewDetail);





/**
 * 지도 API
 */

//장소 검색
routes.get('/map', map.getMap);

module.exports = routes;