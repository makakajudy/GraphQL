import { gql, useQuery } from '@apollo/client';
import React, { useEffect,useState } from 'react'

const getAuthorsQuery=gql`
{
    authors{
        name
        age
        id
    }

}
`

function AuthorList(){
    //call the usequery()pass in thr queryname
    const{data}=useQuery(getAuthorsQuery);
    const[authorlist,setAuthorlist]=useState([]);//an array of users

    //when data updates this useEffect() is automatically called        
    useEffect(()=>{
        if(data){
            setAuthorlist(data.authors);//??
            //console.log(data);
            }           
            
        },[data]
    );

    
    return(
        <div>  {" "}  
                {authorlist.map((val)=>{
                    
                    return <li key={val.id}>{val.name}</li>
                    }

                )}                
            </div>
    );


}

export default AuthorList;

