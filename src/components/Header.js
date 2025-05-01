import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { avatar, logo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  const showGptSearch=useSelector((store)=> store.gpt.showGptSearch);
  const handleSignOut= ()=>{
    signOut(auth).then(() => {    })
    .catch((error) => {
    });
  }
  useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unSubscribe();
  },[]);
  const handleGptSearch=()=>{
    dispatch(toggleGptSearchView());
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-24 p-4" src={logo} alt="logo"/>
        <h3 className='absolute z-10 py-20 text-2xl font-bold text-red-600'>CINEVERSE</h3>
        {user && <div className='flex'>
          <button className='bg-violet-700 text-white  px-4 my-6 mx-4 rounded-lg'
           onClick={handleGptSearch}>
            {showGptSearch?"Homepage":"Gpt Search"}</button>
          <img className='w-12 h-12' alt="usericon" src={avatar}/>
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>}

    </div>
  )
}

export default Header