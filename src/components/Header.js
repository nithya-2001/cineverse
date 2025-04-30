import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  const handleSignOut= ()=>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-24 p-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZrmyHdEXq3crIWfpomk6_DqIXqZByyhFg8w&s"
           alt="logo"/>
        {user && <div className='flex'>
          <img className='w-12 h-12' alt="usericon" src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"/>
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>}

    </div>
  )
}

export default Header