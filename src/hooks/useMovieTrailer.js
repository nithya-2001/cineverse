import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer= (id)=>{
    const dispatch=useDispatch();
    const trailerVideo=useSelector((store)=> store?.movies?.trailerVideo)
      const getMovieVideo= async ()=>{
        const data= await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US", options);
        const json=await data.json();
        const filterData=json.results.filter((video) => video.type==="Trailer");
        const trailer=filterData.length? filterData[0]: json.results[0];
        dispatch(addTrailerVideo(trailer));
      }
    
      useEffect(()=>{
        !trailerVideo && getMovieVideo();
      },[])
};

export default useMovieTrailer;