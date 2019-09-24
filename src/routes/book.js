var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var bookController = require('./../controller/book-controller');

// 새 리뷰 등록
routes.post('/', passport.authenticate('jwt', {
    session: false
}), bookController.writeReview);

// 리뷰 수정
routes.patch('/:id', passport.authenticate('jwt', {
    session: false
}), bookController.editReview);

// 책 리뷰 삭제
routes.delete('/:id', passport.authenticate('jwt', {
    session: false
}), bookController.deleteReview);

// 책 리뷰 리스트 가져오기
routes.get('/:id', passport.authenticate('jwt', {
    session: false
}), bookController.getReviewList);

// 책 리뷰 디테일 가져오기
routes.get('/detail/:id', passport.authenticate('jwt', {
    session: false
}), bookController.getReviewDetail);


module.exports = routes;