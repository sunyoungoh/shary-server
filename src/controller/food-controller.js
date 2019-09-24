const Food = require('../models/food');

// 새 리뷰 작성
exports.writeReview = (req, res) => {

    let newReview = Food(req.body);
    let writer = req.user._id;
    newReview.writer = writer;
    newReview.tags = req.body.tags.split(',');

    newReview.save((err, food) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                'msg': err
            });
        }
        console.log(food);
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}

    
exports.getReviewList = (req, res) => {

    console.log('### 요청한 리뷰리스트 id : ', req.params.id);

    let reviewbook_id = req.params.id;

    Food.find({
        reviewbook: reviewbook_id, // 리뷰북 id로 검색
        writer: req.user._id
    }, function (err, foods) {
        console.log(foods);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!foods) {
            return res.status(404).json({
                error: 'reviewbook not found'
            });
        }
        if (foods) {
            return res.status(200).json(foods);
        }
    });
}

// 리뷰 디테일 가져오기
exports.getReviewDetail = (req, res) => {

    console.log('#### 요청한 리뷰 id : ', req.params.id);
    let review_id = req.params.id;

    Food.findOne({
        _id: review_id, // 리뷰 id로 검색
        writer: req.user._id
    }, function (err, food) {
        console.log(food);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!food) {
            return res.status(404).json({
                error: 'book detail not found'
            });
        }
        if (food) {
            console.log('완료');
            return res.status(200).json(food);
        }
    });
}

// 책 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Food.findByIdAndDelete(review_id, (err, food) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        console.log('삭제완료 book:', food);
        return res.json(food);
    })
}

exports.editReview = (req, res) => {

    console.log("@@@ editReview @@@");
    console.log('수정할 review_id : ', req.params.id);
    console.log('수정할 정보: ', req.body);
    console.log("=================================================")
    Food.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, food) {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': food
        });
    });
}
    
