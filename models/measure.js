const mongoose = require('mongoose');

const measureSchema = mongoose.Schema({
   measureDate: { type: Date, required: true },
   temperature: { type: Number, required: true },
   pressure: { type: Number, required: true },
   humidity: { type: Number, required: true },
   luminosity: { type: String, required: true },
   movement: { type: Number, required: true },
   cardId: { type: Number, required: true }
});

module.exports = mongoose.model('measure', measureSchema);