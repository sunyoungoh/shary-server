const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('../models/image');


const MovieReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook'
    },
    title: String,
    director: String,
    releaseDate: Date,
    overview: String,
    genre: String,
    watchDate: Date,
    posterPath: String,
    rating: Number,
    famousLine: String,
    review: String,
    tags: [{
        type: String
    }],
    images: [Image.schema],
    viewCnt: Number,   // 조회수
    like: Number,      // 좋아요 
    liker: {           // 좋아요 누른 사람
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { // 리뷰생성일자
        type: Date,
        default: Date.now()
    },
    editedAt:{ // 수정한 날짜
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('MovieReview', MovieReviewSchema);