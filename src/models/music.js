var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../models/image');


var MusicReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewbook: {
        type: Schema.Types.ObjectId,
        ref: 'Reviewbook',
        required: true
    },
    trackName: String,
    artistName: String,
    collectionName: String,
    artworkUrl100: String,
    primaryGenreName: String,
    releaseDate: Date,
    listeningDate: Date,
    image: String,
    review: String,
    tags: [{
        type: String
    }],
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
    editedAt: { // 수정한 날짜
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('MusicReview', MusicReviewSchema);