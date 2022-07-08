import React, { Fragment, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './search.css'
const Search = () => {
    const history = useNavigate();
    // console.log(history);
    const [keyword,setKeyWord] = useState("");
    const searchSubmitHandler = (event)=>{
        event.preventDefault();
        if(keyword.trim())
        {
            console.log(keyword);
            history(`/products/${keyword}`)
        }
        else{
            history(`/products`);
        }
    }
    return (
        <Fragment>
            <form className = "searchbox" onSubmit = {searchSubmitHandler}>
                <input 
                type = "text"
                 placeholder = "Search the product" 
                 onChange = {(event) => setKeyWord(event.target.value)}
                value = {keyword} />
                <input type = "submit" value = "Search"/>
            </form>
        </Fragment>
    )
}

export default Search
