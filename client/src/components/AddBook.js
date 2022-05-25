import React,{useEffect,useState} from 'react';
//import React,{Component} from 'react';
import{ gql,useQuery} from '@apollo/client';


//a)defined the query
export const getAuthorsQuery=gql`
{
    authors{
        name
        
    }
}
`
//in the component BookList usinf usequery to access the getBooksquery
function AddBook(){
    //const[name,setName]=useState("");
    
    
    
    
    return(
        <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
                
            </select>
        </div>
        <button>+</button>

    </form>
    );

}

export default AddBook;