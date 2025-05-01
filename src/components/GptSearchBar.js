import React, { useRef } from 'react';
import client from '../utils/openai';
import { options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const searchText=useRef(null);
    const dispatch=useDispatch();

    const searchMovieTMDB=async (movie)=>{
        const data= await 
        fetch('https://api.themoviedb.org/3/search/movie?query=' + movie+
            '&include_adult=false&language=en-US&page=1', options)
        const json= await data.json();
        return json.results;
    }

    const handleGptSearchClick=async ()=>{

        const gptQuery="Act as a movie recommendation system and suggest some movies for the query:"+
            searchText.current.value+
            ":only give me 10 movie names, comma seperated like the example result given ahead. Example Result= A, B, C"
        const gptResults = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'user', content: gptQuery },
            ],
          });
        const gptMovies=gptResults.choices?.[0]?.message?.content.split(",")
        const promiseArray=gptMovies.map((movie)=> searchMovieTMDB(movie));
        const tmdbResults= await Promise.all(promiseArray);
        dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}))
    }

  return (
    <div className='pt-[12%] flex justify-center'>
        <form className='w-1/2 bg-black bg-opacity-70 grid grid-cols-12' onSubmit={(e)=> e.preventDefault()}>
            <input ref={searchText} type="text" placeholder='What would you like to watch today?' 
            className= 'p-4 m-4 col-span-9'
            />
            <button className='text-white bg-red-700 rounded-lg py-2 px-4 m-4 col-span-3'
                onClick={handleGptSearchClick}
            >
                Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar;