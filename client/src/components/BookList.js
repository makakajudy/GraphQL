
import React,{useEffect,useState} from 'react';
//import React,{Component} from 'react';
import{ gql,useQuery} from '@apollo/client';


//a)defined the query
export const getBooksQuery=gql`
{
    books{
        name
        id
    }
}
`
//in the component BookList usinf usequery to access the getBooksquery
function BookList(){
    const{data}=useQuery(getBooksQuery) ;
    const[booklist,setBooklist]=useState([]);
    useEffect(()=>{
        
        if(data){
            setBooklist(data.books);
            //console.log(data);
            }           
            
        },[data]
    );

    return(
        <div>  {" "}  
                {booklist.map((val)=>{
                    
                    return <li key={val.id}>{val.name}</li>
                    }

                )}                
            </div>
    );

}
/*
class BookList extends Component {
    render(){
        return(
            <div>
                <ul id="book-list">
                    <li>Book name</li>
                </ul>
            </div>
        );
    }
}*/

export default BookList;