const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('../models/image');

const BookReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook',
        required: true
    },
    title: String,
    author: String,
    publisher: String,
    pubdate: Date,
    description: String,
    image: String,
    price: String,
    readingStartDate: Date,
    readingEndDate: Date,
    impressivePassage: String,
    review: String,
    tags: [{
        type: String
    }],
    images: [Image.schema],
    rating: Number, // 별점
    viewCnt: Number, // 조회수
    like: Number, // 좋아요 
    liker: { // 좋아요 누른 사람
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

module.exports = mongoose.model('BookReview', BookReviewSchema);