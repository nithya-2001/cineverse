import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies= ()=>{
    const dispatch=useDispatch();
    const popularMovie=useSelector((store)=> store?.movies?.popularMovies)
  const getPopularMovies= async () =>{
    const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const json=await data.json();
    //console.log(json.results);
    dispatch(addPopularMovies(json.results));
  }

  useEffect(()=>{
    !popularMovie && getPopularMovies();
  },[]);

};

export default usePopularMovies;