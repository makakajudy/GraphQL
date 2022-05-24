
const graphql = require('graphql');
const _ =require('lodash');
const Author = require('../models/author');
const Book =require('../models/book');


//what schema does

//A)define obj types (OBJECT INCLUDE BOOK AUTHOR)
//B)def relation b2n obj
//C)def root query
// use of{} is called destructuring where we access a specific var/fun from  graphql package
 const { 
     GraphQLObjectType,
     GraphQLString,
     GraphQLSchema ,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } = graphql;
 
//--------A----------

//defining a new type booktype which use GraphQLObjectType() to hold book info as obj
//give the objecttype a name:Book and define its fields:id,name,genre using fields() wrapping function

//basic type without using GraphQLObjectType for the BOOK OBJECT

/*name:'Book',
  fields:(this is anarrow function)=>({
      id:{type:int},
      name:{type:string},
      genre:{type:string}
    }) brackets for wrapping the fields
 */

//basic type using GraphQLObjectType from graphql

const BookType = new GraphQLObjectType({
     name: 'Book',
     fields: ( ) => ({
         id: { type: GraphQLID },
         name: { type: GraphQLString },
         genre: { type: GraphQLString },
         //----B-----this is the creating relationship part
         author:{
             type:AuthorType,
             resolve(parent,args){
                 //console.log(parent)
                 //return author whose id match authorid in the parent
                 //return _.find(authors,{id:parent.authorId})
                // look in the author collection and return all records whose ID matches authorId in the parent obj which Book 
                return Author.findById(parent.authorId)

             }
            }
     })
 });


 const AuthorType= new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},       
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),//enable a list of bks to be returned
            resolve(parent,args){
                //filter out from bk data and return books whose authorid matched id in the sparent object
                //return _.filter(books,{authorId:parent.id})

                //updated resolve () using the Author model in the Author.js
                // find all bks whose authorId matches ID in the parent obj which is 
                return Book.find({authorId:parent.id});
            }
        }
    })
});

//-------C-------

 //def ROOT QUERY start up/entry point or landing points or end point into the graphql
 /*
  name:'RootQuery',
  fields:{
      book:{
          type:BookType,
          arg:{id:{type:int}},
      resolve()
    }

  }
  */
 //root query for a single book 
 const RootQuery =new GraphQLObjectType({
     name:'RootQueryType',
     fields:{
         book:{
             type:BookType,
             args:{id:{type:GraphQLID}},//in addition to the above bk name user has to entre bkId
             resolve(parent,args){
                 //code to get dat from db or other sources
                 //console.log(parent)
                //return _.find(books,{id:args.id});
                //uses the Book model to finds record in the mongodb by Id user enters and returns it
                return Book.findById(args.id);
             }         

         },
         //another root query
         author:{
             type:AuthorType,
             args:{id:{type:GraphQLID}},
             resolve(parent,args){
                 //return _.find(authors,{id:args.id})
                 //uses the Author model to finds record in the mongodb by Id user enters and returns it
                 return Author.findById(args.id)

             }
         },
         //root query for all bks /authors,note the plural books ,authors
         books:{
             type:new GraphQLList(BookType),
             resolve(parent,args){
                 //return all books using the Book model
                 return Book.find({})
             }
         },
         authors:{
             type:new GraphQLList(AuthorType),
             resolve(parent,args){
                // return all authors using the Author model
                return Author.find({});

             }
         }    

     }

 });
//adding a new author,name of this obj is Mutation
//has fields{addauthor of type:AuthorType and args{name,age}}
//when resolve()is called it uses the Author model and add the name and age 
const Mutation =new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                },
                resolve(parent,args){
                    //new Author() in the author.js refers to the mongoose model schema
                    //which translates to creating a new Author or table
                    let author=new Author({ 
                        name:args.name,
                        age:args.age
                    });
                    return author.save();                   
                }
        },
        //mutation for adding a book
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString) },
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
                },
                resolve(parent,args){
                    //new Author refers to the mongoose model schema
                    let book=new Book({ 
                        name:args.name,
                        genre:args.genre,
                        authorId:args.authorId
                    });
                    return book.save();                   
                }
        }
    }
})



//def what schema user can used from the front end
//export makes these obj/modules accessible outside this file
 module.exports=new graphql.GraphQLSchema({
     query:RootQuery,
     mutation:Mutation

 });
