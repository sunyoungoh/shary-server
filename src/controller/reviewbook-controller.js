const Reviewbook = require('../models/reviewbook');
// let bookController= require('./book-controller');


// 새 리뷰북 생성
exports.writeReviewbook = function (req, res) {
    if (!req.body.title) {
        return res.status(400).json({
            'msg': 'No request'
        });
    }

    let newReviewBook = new Reviewbook(req.body);
    newReviewBook.writer = req.user._id;

    newReviewBook.save((err, reviewbook) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        return res.status(201).json(reviewbook);
    })

}

// 리뷰북 수정
exports.editReviewbook = function (req, res) {

    console.log('수정할 reviewbook_id : ', req.params.id);
    console.log('수정할 정보: ', req.body);
    console.log("=================================================")
    Reviewbook.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true,
        safe: true,
        upsert: true
    }, function (err, reviewbook) {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': reviewbook
        });
    })
}

// 리뷰 수정 시 리뷰북에 반영
exports.updateReviewbookInfo = function (reviewbookId, reviewId, action) {
    let conditions;
    let msg;
    if (action == "write") {
        conditions = {
            $addToSet: {
                reviews: reviewId
            },
            $inc: {
                count: 1
            },
            lastDate: Date.now()
        }
        msg = "추가 완료"
    } else if (action == "edit") {
        conditions = {
            lastDate: Date.now()
        }
    } else if (action == "delete") {
        conditions = {
            $pull: {
                reviews: reviewId
            },
            $inc: {
                count: -1
            }
        }
        msg = "삭제 완료"
    }

    Reviewbook.findOneAndUpdate({
        "_id": reviewbookId
    }, conditions, {
        new: true,
        safe: true,
        upsert: true
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('reviewbook' + msg, result);
        }
    });
}


exports.getAllReviewbookList = (req, res) => {

    console.log('요청한 카테고리 리뷰북리스트 : ', req.params.category);

    Reviewbook.find({
        category: req.params.category,
        writer: req.user._id
    }, function (err, reviewbooks) {
        console.log(reviewbooks);
        if (err) {
            return res.status(500).json({
                'msg': err
            });
        }
        if (reviewbooks.length) {
            return res.status(200).json(reviewbooks);

        } else {
            return res.status(404).json({
                'msg': '리뷰북이 없습니다.'
            });
        }
    });
}


exports.deleteReviewbook = (req, res) => {

    console.log('요청한 카테고리 리뷰북리스트 : ', req.params.id);

    let reviewbook_id = req.params.id;
    Reviewbook.findByIdAndDelete(reviewbook_id, (err, reviewbook) => {

        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };

        console.log(reviewbook.category, reviewbook.title, '내부 리뷰들 삭제')
        // 리뷰북 안에 있는 리뷰들 삭제
        switch (reviewbook.category) {
            case 'book':
                let Book = require('../models/book');
                Book.deleteMany({
                    reviewbook: reviewbook_id
                }, (err, results) => {
                    console.log("삭제한 리뷰 개수 결과", results.n);
                });
                break;
            case 'food':
                let Food = require('../models/food');
                Food.deleteMany({
                    reviewbook: reviewbook_id
                }, (err, results) => {
                    console.log("삭제한 리뷰 개수 결과", results.n);
                });
                break;
            case 'music':
                let Music = require('../models/music');
                Music.deleteMany({
                    reviewbook: reviewbook_id
                }, (err, results) => {
                    console.log("삭제한 리뷰 개수 결과", results.n);
                });
                break;
            case 'movie':
                let Movie = require('../models/movie');
                Movie.deleteMany({
                    reviewbook: reviewbook_id
                }, (err, results) => {
                    console.log("삭제한 리뷰 개수 결과", results.n);
                });
                break;
        }
        return res.json(reviewbook);
    })
}