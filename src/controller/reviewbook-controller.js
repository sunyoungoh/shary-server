const Reviewbook = require('../models/reviewbook');

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

/**
 * 테스트용 리뷰북 생성 메소드
 */
exports.writeReviewbook = function (req, res) {
    if (!req.body.title) {
        return res.status(400).json({
            'msg': 'No request'
        });
    }

    let newFoodReviewBook = new Reviewbook();
    newFoodReviewBook.title = req.body.title;
    newFoodReviewBook.category = req.body.category;
    newFoodReviewBook.writer = req.user._id;

    newFoodReviewBook.save((err, reviewList) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        return res.status(201).json(reviewList);
    })

}


exports.getReviewbookList = (req, res) => {

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
        console.log('삭제완료 book:', reviewbook);
        return res.json(reviewbook);
    })
}