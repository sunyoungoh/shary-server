var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var musicController = require('./../controller/music-controller');

// 새 리뷰 등록
routes.post('/', passport.authenticate('jwt', {
    session: false
}), musicController.writeReview);

// 리뷰 수정
routes.patch('/:id', passport.authenticate('jwt', {
    session: false
}), musicController.editReview);

// 책 리뷰 삭제
routes.delete('/:id', passport.authenticate('jwt', {
    session: false
}), musicController.deleteReview);

// 책 리뷰 리스트 가져오기
routes.get('/:id', passport.authenticate('jwt', {
    session: false
}), musicController.getReviewList);

// 책 리뷰 디테일 가져오기
routes.get('/detail/:id', passport.authenticate('jwt', {
    session: false
}), musicController.getReviewDetail);


module.exports = routes;