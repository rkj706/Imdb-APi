'use strict';
const mongoose=require('../config/mongoDb');
const Schema=mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');


var userSchema=new Schema({
    firstName:String,
    lastName:String,
    email:{type:String,index:true},
    password:String,
    favourite:[{type:Schema.Types.ObjectId,ref:'Genre'}]
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User=mongoose.model('User',userSchema);
module.exports=User;
