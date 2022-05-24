const express=require('express');//include/import express module that reside in the node_module file
const {graphqlHTTP}=require('express-graphql');//this module help express understand graphql
const schema= require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();//calling the express function to create our app


/*  MIDDLEWARE SET UP*/

//allow cross-origin request
app.use(cors());

/*to connect to a single db use .connect() for more use .createconnection()
my credintial:user_judy db:test*/
mongoose.connect('mongodb+srv://user_judy:123@cluster0.gd4m1.mongodb.net/test?retryWrites=true&w=majority')

/*one the connecton is open fire the this fun ()=> and
 log this message on the cmd terminal*/
mongoose.connection.once('open',()=>{
    console.log('connected to db');

});
//create schema that helps describe the structure of the graph of the data eg datatype
app.use('/graphql',graphqlHTTP({
    schema,//refers to the schema file
    graphiql:true// enable us to use the graphiql to test our app functionality,mutate data
}));


//tell our app what port to listen on
app.listen(4000,()=>{
    console.log("listen for request on port 4000");//message that will display when app is running

});



