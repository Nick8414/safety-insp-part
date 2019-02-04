const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    ratingName : { type: String, required: true }
});

module.exports = mongoose.model('Rating', ratingSchema);