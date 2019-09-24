const Tv = require('../models/tv');
const rbController = require('../controller/reviewbook-controller');



exports.writeReview = (req, res) => {
    let episodes= [];
    for(let episode of req.body.episodes){
        if(episode.content !=""){
            episodes.push(episode.content);
        }
    };
    if (req.body.tags !== undefined) {
        req.body.tags = req.body.tags.split(',')
    }
    req.body.episodes = episodes;

    const writer = req.user._id;
    req.body.writer = writer;

    let newReview = Tv(req.body);
    newReview.save((err, tv) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        }
        rbController.updateReviewbookInfo(req.body.reviewbook, tv._id, 'write');
        return res.status(201).json({
            'msg': '등록되었습니다'
        });
    });
}

// 티비 리뷰리스트 가져오기
exports.getBookReviewList = (req, res) => {
        console.log('요청한 리뷰리스트 id', req.params._id);
        // 책 리뷰북 가져오기
        let reviewbook_id = req.params.id;
            Tv.find({reviewbook: reviewbook_id}, function (err, reviews) {
            console.log(reviews);
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (!reviews) {
                return res.status(404).json({
                    error: 'reviewbook not found'
                });
            }
            if (reviews) {
                return res.status(200).json(reviews);
            }
        });
}
exports.getdetailReview = (req, res) => {
    let review_id = req.params.id;
    Tv.findById(review_id, (err, review) => {
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
    req.body.tags = req.body.tags.toString().split(',');
    const writer = req.user._id;
    req.body.writer=writer;
    let episodes= [];
    for(let episode of req.body.episodes){
        if(episode.content !=""){
            episodes.push(episode.content);
        }
    };
    req.body.episodes=episodes;

    Tv.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, tv) {
        if (err) {
            console.log(err);
        }
        rbController.updateReviewbookInfo(req.body.reviewbook, tv._id, 'edit');
        return res.status(201).json({
            'msg': '리뷰 업데이트 성공',
            'result': tv
        });
    });
}


// 리뷰 삭제
exports.deleteReview = (req, res) => {
    let review_id = req.params.id;
    Tv.findByIdAndDelete(review_id, (err, movie) => {
        if (err) {
            return res.status(400).json({
                'msg': err
            });
        };
        rbController.updateReviewbookInfo(req.body.reviewbook, tv._id, 'delete');
        console.log('삭제완료 movie:', movie);
        return res.json(movie);
    })
}
