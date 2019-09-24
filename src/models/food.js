const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('../models/image');

const FoodReviewSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook',
        required: true
    },
    name: String,
    eatDate: Date,
    phoneNumber: String,
    roadAddress: String,
    typeOfFood: String,
    evaluation: String,
    foodPicture: [Image.schema],
    tags: [{
        type: String,
        trim: true
    }],
    viewCnt: Number,   // 조회수
    like: Number,      // 좋아요 
    liker: [{           // 좋아요 누른 사람
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    x: String,
    y: String,
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



module.exports = mongoose.model('FoodReview', FoodReviewSchema);