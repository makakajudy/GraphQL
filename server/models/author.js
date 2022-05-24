
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const authorScheme =new Schema({
    name:String,
    age:Number,
   //no need for id as it will be auto-genrated 

});
//a module is a collection/table in mongodb
//create a model/table using the model('tablename',modelSchema)
//make is accessible using export()
module.exports=mongoose.model('Author',authorScheme);