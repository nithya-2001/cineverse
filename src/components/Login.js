import React, {  useRef, useState } from 'react'
import Header from './Header'
import { validateForm } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

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
              }).then(() => {
                navigation("/browse")
              }).catch((error) => {
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
            navigation("/browse")
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
        <h3 className='absolute z-10 py-20 px-2 m-4 text-2xl font-bold text-red-600'>CINEVERSE</h3>
        <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/US-en-20250421-TRIFECTA-perspective_d267de16-c801-48de-9014-f47514040d8b_small.jpg"
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