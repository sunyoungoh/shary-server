const Movie = require('../models/movie');
const rbController = require('../controller/reviewbook-controller');




//영화 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {

    console.log('요청한 리뷰리스트 id', req.params.id);
    let reviewbook_id = req.params.id;
    Movie.find({ reviewbook: reviewbook_id }, (err, reviews) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!reviews) {
            return res.status(404).json({
                error: 'reviewMovie not found'
            });
        }
        if (reviews) {
            return res.status(200).json(reviews);
        }
    });
}

// 영화 리뷰 작성
exports.writeReview = (req, res) => {
    if (req.body.tags !== undefined) {
        req.body.tags = req.body.tags.split(',')
    }
    let newReview = Movie(req.body);
    let writer = req.user._id;
    newReview.writer = writer;
    

    newReview.save((err, movie) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(movie);
        rbController.updateReviewbookInfo(movie.reviewbook, movie._id, 'write');
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}
exports.getdetailReview = (req, res) => {
    let review_id = req.params.id;
    Movie.findById(review_id, (err, review) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!review) {
            return res.status(404).json({
                error: 'reviewMovie not found'
            });
        }
        if (review) {
            return res.status(200).json(review);
        }
    })
}

//리뷰 수정
exports.editReview = (req, res) => {
    let writer = req.user._id;
    req.body.writer=writer;
    req.body.tags = req.body.tags.toString().split(',');
    Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        editedAt:Date.now()
    },{
        new: true,
        safe: true,
        upsert: true
    }, function (err, movie) {
        if (err) {
            console.log(err);
        }
        rbController.updateReviewbookInfo(movie.reviewbook, movie._id, 'edit');
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': movie
        });
    });
}

// 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Movie.findByIdAndDelete(review_id, (err, movie) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        rbController.updateReviewbookInfo(movie.reviewbook, movie._id, 'delete');
        console.log('삭제완료 movie:', movie);
        return res.json(movie);
    })
}