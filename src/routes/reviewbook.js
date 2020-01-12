var express = require('express'),
    routes = express.Router();
var passport = require('passport');
var reviewbookController = require('./../controller/reviewbook-controller');


// 카테고리 전체 리뷰북 가져오기
routes.get('/:category', passport.authenticate('jwt', {
    session: false
}), reviewbookController.getAllReviewbookList);


// 새 리뷰북 생성
routes.post('/', passport.authenticate('jwt', {
    session: false
}), reviewbookController.writeReviewbook);


// 리뷰북 수정
routes.patch('/:id', passport.authenticate('jwt', {
    session: false
}), reviewbookController.editReviewbook);


// 리뷰북 삭제
routes.delete('/:id', passport.authenticate('jwt', {
    session: false
}), reviewbookController.deleteReviewbook);



module.exports = routes;