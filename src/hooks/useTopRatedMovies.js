import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies= ()=>{
    const dispatch=useDispatch();
    const topRatedMovie=useSelector((store)=> store?.movies?.topRatedMovies)
  const getTopRatedMovies= async () =>{
    const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const json=await data.json();
    //console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(()=>{
    !topRatedMovie&&getTopRatedMovies();
  },[]);

};

export default useTopRatedMovies;