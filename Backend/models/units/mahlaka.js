const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const mahlakaSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
    ploga:{type:String},
    index:{type:Number},
    // sadir:{type:String},
});

const Mahlaka = mongoose.model('Mahlaka', mahlakaSchema);

module.exports = Mahlaka;

