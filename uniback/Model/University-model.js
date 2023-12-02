const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    domains: [String],
    webPages: [String],
    country: { type: String, required: true },
    alphaTwoCode: { type: String, required: true },
    stateProvince: { type: String },
});

module.exports = mongoose.model('Universities', universitySchema);