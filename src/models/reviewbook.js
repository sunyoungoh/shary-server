var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewbookSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {  // 리뷰북 생성일자
        type: Date,
        default: Date.now()
    },
    lastDate: { // 마지막 리뷰 작성 날짜
        type: Date,
        default: Date.now()
    },
    count: {
        type: Number,
        default: 0
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

module.exports = mongoose.model('Reviewbook', ReviewbookSchema);