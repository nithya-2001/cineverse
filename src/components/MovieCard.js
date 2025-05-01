import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({image}) => {
  return (
    <div className='w-40 pr-4'>
            <img alt="Movie logo" src={IMG_CDN_URL+image}/>
    </div>
  )
}

export default MovieCard