'use strict';
const mongoose=require('../config/mongoDb');
const Schema=mongoose.Schema;


var genreSchema=new Schema({
    name:String
});


var Genre=mongoose.model('Genre',userSchema);
module.exports=Genre;
