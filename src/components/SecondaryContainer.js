import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies=useSelector((store)=> store?.movie)

  return (

    movies.nowPlayingMovies &&(
     <div className='bg-black w-screen'>
      <div className='-mt-40 relative z-20 pl-12'>
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies?.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
      <MovieList title={"Up Coming"} movies={movies?.upcomingMovies} />
      <MovieList title={"Horror"} movies={movies?.nowPlayingMovies} />
    </div>
    </div>)
  )
}

export default SecondaryContainer