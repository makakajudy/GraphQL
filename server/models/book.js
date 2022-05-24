//mongoose def the format the db will be store in the mongodb
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bookScheme =new Schema({
    name:String,
    genre:String,
    authorId:String,
   // id:GraphQLID no need as it will be auto-created

});
//a module is a collection/table in mongodb
//create a model/table using the model('tablename',modelSchema)
//make is accessible using export()
module.exports=mongoose.model('Book',bookScheme);
