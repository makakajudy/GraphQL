import React from 'react';
//import React,{Component} from 'react';
import {
  ApolloClient,  
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";


//components
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
/*nesting a component inside another (<componentName/>)
in this case the root component*/

//apollo client set up
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache()
 
});
//this is our root fun/component/class
function App(){
 
    return(
      <ApolloProvider client= {client}>
      <div id="main">
        <h1>ninja's reading list</h1>
        <BookList/>
        
        <AuthorList/>
     </div>
 </ApolloProvider>

    )
  
};
/*
class App extends Component {
  render(){

     return (

       <ApolloProvider client= {client}>
         <div id="main">
           <h1>ninja's reading list</h1>
           <BookList/>
        </div>
    </ApolloProvider>
  );
  }
 
}*/

export default App;
