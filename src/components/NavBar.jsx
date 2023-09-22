import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    setSignedIn,
    setInput,
    setUserData,
    selectSignedIn,
    selectUserData
 } from "../slice/UserSlice";
 import Avatar from '@mui/material/Avatar';
 import "../styles/navbar.css";


function NavBar () {
    const [inputValue, setInputValue] = useState("tech");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);
    
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
    }
    
    const logout = () => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }

    return (
        <>
         <div className="navbar">
          {isSignedIn && (  
            <>
               <h1 className="navbar__header">BlogMania 💬</h1>
               <div className="blog__search">
                <input type="text" 
                className="search"
                placeholder="search for a blog"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value)}}
                />
                <button className= "submit" onClick={handleClick}>
                    search
                </button>
              </div>
            </>
             )}
         
         {isSignedIn && (
            <div className="navbar__user__data">
                <Avatar
                className= "user"
                src={userData?.picture}
                alt={userData?.name}
                 />
                 <h1 className="signedin">{userData?.given_name}</h1>
                 <button className="logout__button" onClick={logout}>logout</button>
            </div>
         )}
         </div>
        </>
    )
};

export default NavBar;