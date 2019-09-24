var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// module.exports = ImageSchema;
module.exports = mongoose.model('Image', ImageSchema);


// exports.imageSchema = new mongoose.Schema({
//     filename: String,
//     originalName: String,
//     desc: String,
//     created: { type: Date, default: Date.now }
// });
// exports.Image = mongoose.model('Image', exports.imageSchema);