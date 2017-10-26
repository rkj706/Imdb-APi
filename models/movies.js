'use strict';
const mongoose=require('../config/mongoDb');
const Schema=mongoose.Schema;

const ratings=[1,2,3,4,5,6,7,8,9,10]
var movieSchema=new Schema({
    name:String,
    genre:{type:Schema.Types.ObjectId,ref:'Genre'},
    year :Number,
    reviews:[{text:String,created_at:{type: Date, default: Date.now}}],
    votes:[{userId:{type:Schema.Types.ObjectId,ref:'User'},vote:Boolean}],
    ratings:[{userId:{type:Schema.Types.ObjectId,ref:'User'},rating:{type:Number,enum:ratings}}]
});


var Movie=mongoose.model('Movie',movieSchema);
module.exports=Movie;
