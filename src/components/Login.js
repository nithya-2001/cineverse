import React, {  useRef, useState } from 'react'
import Header from './Header'
import { validateForm } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { BG_URL } from '../utils/constants';

const Login = () => {

    const [isSignInform,setIsSignInForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
    const navigation=useNavigate();

    const toggleSignIn = () =>{
       setIsSignInForm(!isSignInform)
    }

    const email=useRef(null)
    const password=useRef(null)
    const name=useRef(null)

    const handleButton = () =>{
        const message= validateForm(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;

        if(!isSignInform){
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
             .then((userCredential) => {
             // Signed up 
             const user = userCredential.user;
             updateProfile(user, {
                displayName: user.current.value, 
              }).then(() => { })
              .catch((error) => {
                setErrorMessage(error.message)
              });
             
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
            });
        }
        else{
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"-"+errorMessage)
            });
        }
    }

  return (
    <div>
        <Header />
        <div className='absolute'>
        <img src={BG_URL}
        alt="login-logo"/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='w-4/12 p-12 left-0 right-0 my-36 mx-auto absolute bg-black text-white bg-opacity-80'>
            <h1 className='font-bold text-2xl '>
                {isSignInform?"Sign In" : "Sign Up"}
            </h1>
            {!isSignInform && (
                <input 
                    ref={name}
                    type="text" 
                    placeholder='Full Name'
                    className="p-4 my-4 w-full rounded-lg text-black"
                />
            )}
            <input 
                ref={email}
                type="text" 
                placeholder="Email or Phone number" 
                className="p-4 my-4 w-full rounded-lg text-black"
            />
            <input 
                ref={password}
                type="password" 
                placeholder="Password" 
                className="p-4 my-4 w-full rounded-lg text-black"
            />
            <p className='text-red-500 font-bold'>{errorMessage}</p>
            <button className="p-4 my-6 bg-red-700 w-full rounded-xl" onClick={handleButton}>
               {isSignInform ? "Sign In" : "Sign Up"}
            </button>
            <p className='w-full p-2 cursor-pointer' onClick={toggleSignIn}>
                {isSignInform ? "New to Cineverse?Sign Up now" : "Already a user?Sign In now"}
            </p>
        </form>
    </div>
  )
}

export default Login