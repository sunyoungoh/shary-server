var Book = require('../models/book');
var Food = require('../models/food');
var Movie = require('../models/movie');
var Music = require('../models/music');
var Tv = require('../models/tv');

function searchConditions(category, term) {
    let conditions;
    switch (category) {
        case 'book':
            conditions = {
                $or: [{
                    "title": {
                        $regex: '.*' + term + '.*'
                    }
                }, {
                    "author": {
                        $regex: '.*' + term + '.*'
                    }
                }]
            }
            break;
        case 'music':
            conditions = {
                $or: [{
                    "trackName": {
                        $regex: '.*' + term + '.*'
                    }
                }, {
                    "artistName": {
                        $regex: '.*' + term + '.*'
                    }
                }]
            }
            break;
        case 'food':
            conditions = {
                "name": {
                    $regex: '.*' + term + '.*'
                }

            }
            break;
        case 'movie', 'tv':
            conditions = {
                "title": {
                    $regex: '.*' + req.params.term + '.*'
                }
            }
            break;
    }
    return conditions;
}

function searchQuery(category, conditions) {
    let query;
    switch (category) {
        case 'book':
            query = Book.find(conditions);
            break;
        case 'music':
            query = Music.find(conditions);
            break;
        case 'food':
            query = Food.find(conditions);
            break;
        case 'movie':
            query = Movie.find(conditions);
            break;
        case 'tv':
            query = Tv.find(conditions);
            break;
    }
    return query;
}


/**
 *  `검색페이지에서 리뷰 검색`
 */

exports.getSearchReview = (req, res) => {
    console.log('### 카테고리 : ', req.params.category);
    console.log('### 검색어 : ', req.params.term);

    let conditions = searchConditions(req.params.category, req.params.term);
    let query = searchQuery(req.params.category, conditions);

    query.exec(function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (reviews.length) {
            return res.status(200).json(reviews);

        } else {
            return res.status(404).json({
                msg: '리뷰가 없습니다.'
            });
        }
    });
}


/**
 *  `검색페이지에서 태그로 검색`
 */
exports.getSearchTag = (req, res) => {
    console.log('### 카테고리 : ', req.params.category);
    console.log('### 검색할 태그 : ', req.params.term);

    let conditions = {
        "tags": req.params.term
    };
    let query = searchQuery(req.params.category, conditions);

    query.exec(function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (reviews.length) {
            return res.status(200).json(reviews);

        } else {
            return res.status(404).json({
                msg: '리뷰가 없습니다.'
            });
        }
    });
}


/**
 *  `리뷰북에서 검색`
 */

exports.getSearchInReviewbook = (req, res) => {
    console.log('### 카테고리 : ', req.params.category);
    console.log('### 리뷰북 아이디 : ', req.params.id);
    console.log('### 검색어 : ', req.params.term);

    let conditions = {
        $and: [{
                reviewbook: req.params.id
            },
            searchConditions(req.params.category, req.params.term)
        ]
    };

    let query = searchQuery(req.params.category, conditions);

    query.exec(function (err, reviews) {
        console.log(reviews);
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (reviews.length) {
            return res.status(200).json(reviews);

        } else {
            return res.status(404).json({
                msg: '리뷰가 없습니다.'
            });
        }
    });
}