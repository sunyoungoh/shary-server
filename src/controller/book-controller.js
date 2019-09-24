const Book = require('../models/book');
const rbController = require('../controller/reviewbook-controller');

// 새 리뷰 작성
exports.writeReview = (req, res) => {
    let newReview = Book(req.body);
    newReview.writer = req.user._id;
    if (req.body.tags !== undefined) {
        req.body.tags = req.body.tags.split(',');
    }
    newReview.save((err, book) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(book);
        rbController.updateReviewbookInfo(req.body.reviewbook, book._id, 'write');
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    })
}

// 리뷰 수정
exports.editReview = (req, res) => {
    console.log('수정할 review_id : ', req.params.id);
    console.log('수정할 정보: ', req.body);
    console.log("=================================================")
    req.body.tags = req.body.tags.toString().split(',');
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        editedAt: Date.now()
    }, {
        new: true,
        safe: true,
        upsert: true
    }, function (err, book) {
        if (err) {
            console.log(err);
        }
        rbController.updateReviewbookInfo(req.body.reviewbook, book._id, 'edit');
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': book
        });
    });
}

// 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Book.findByIdAndDelete(review_id, (err, book) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        rbController.updateReviewbookInfo(book.reviewbook, book._id, 'delete');
        console.log('삭제완료 book:', book);
        return res.json(book);
    })
}

// 리뷰 리스트 가져오기
exports.getReviewList = (req, res) => {
    console.log('### 요청한 리뷰리스트 id : ', req.params.id);
    let reviewbook_id = req.params.id;

    Book.find({
        reviewbook: reviewbook_id, // 리뷰북 id로 검색
        writer: req.user._id
    }, function (err, books) {
        console.log(books);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!books) {
            return res.status(404).json({
                error: 'reviewbook not found'
            });
        }
        if (books) {
            return res.status(200).json(books);
        }
    });
}



// 리뷰 디테일 가져오기
exports.getReviewDetail = (req, res) => {
    console.log('#### 요청한 리뷰 id : ', req.params.id);
    let review_id = req.params.id;

    Book.findOne({
        _id: review_id, // 리뷰 id로 검색
        writer: req.user._id
    }, function (err, book) {
        console.log(book);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!book) {
            return res.status(404).json({
                error: 'book detail not found'
            });
        }
        if (book) {
            return res.status(200).json(book);
        }
    });
}