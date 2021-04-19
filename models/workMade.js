const mongoose = require('mongoose');

const schemeName = 'Work';
const workSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String,required: true},
    path: { type: String,required: true},
});
module.exports.Work = mongoose.model(schemeName,workSchema);
module.exports.workSchema = this.workSchema;