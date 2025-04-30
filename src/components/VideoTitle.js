import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-64 px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='font-bold text-3xl'>{title}</h1>
        <p className='py-4 w-1/3'>{overview}</p>
        <div>
            <button className='bg-white rounded-lg text-black p-4 px-12 text-xl'>▶️Play</button>
            <button className='bg-gray-500 rounded-lg text-white p-4 px-12 text-xl bg-opacity-50 mx-2'>More info</button>
        </div>
    </div>
  )
}

export default VideoTitle