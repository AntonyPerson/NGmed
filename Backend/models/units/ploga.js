const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const plogaSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
    gdod:{type:String},
    index:{type:Number},
    // sadir:{type:String},
});

const Ploga = mongoose.model('Ploga', plogaSchema);

module.exports = Ploga;

