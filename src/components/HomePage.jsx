import React from "react";
import "../styles/home.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import { setSignedIn,setUserData, selectSignedIn } from "../slice/UserSlice";

function HomePage () {
        const isSignedIn = useSelector(selectSignedIn);
        const dispatch = useDispatch();

        const handleSucess = (credentialResponse) => { 
          const details = jwt_decode(credentialResponse.credential)
          dispatch(setSignedIn(true));
          dispatch(setUserData(details));
        }
    return (
        <>
         <div className="home__page" style={{display : isSignedIn ? "none" : " "}}>
           {!isSignedIn ? ( <div className="login__message">
                <h2>📗</h2>
                <h1>A Readers favourite place!</h1>
                <p>
                  We provide high quality online resource for reading blogs. Just sign
                  up and start reading some quality blogs.
                </p>
                <div className="login__button">
                <GoogleOAuthProvider clientId="539142718739-ig4129583jtbifb6q3bpkv43jvvhachf.apps.googleusercontent.com">
                     <GoogleLogin
                      // className= "login__button"
                       size="large"
                       onSuccess={handleSucess}
                       onError={() => {
                       console.log('Login Failed');
                      }}
                  
                    />
                    </GoogleOAuthProvider>
                </div>
            </div>
            ) : ( "")}
         </div>
        </>
    )
};

export default HomePage;