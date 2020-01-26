const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
   roomName: { type: String, required: true },
   userId: { type: String, required: true }
});

module.exports = mongoose.model('Card', cardSchema);