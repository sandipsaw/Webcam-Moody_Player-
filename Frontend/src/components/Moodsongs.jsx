import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { useState } from 'react';
import {Link} from 'react-router-dom'

const Moodsongs = ({ songs }) => {
    const [isPlaying, setisPlaying] = useState(null)
    const button = (index) => {
        if (isPlaying === index) {
            setisPlaying(null)
        } else {
            setisPlaying(index)
        }
    }
    const render = songs.map((song, index) => (
        <Link key={index} className="p-5 rounded-[15px] w-1/1 bg-gray-500 mt-5 flex items-center justify-between ">
            <div className="">
                <p className='text-2xl font-semibold text-zinc-800'>{song.title}</p>
                <p className='text-xl font-semibold text-zinc-700'>{song.artist}</p>
            </div>
            <div className="flex">
                {isPlaying === index && <audio src={song.audio} autoPlay={isPlaying === index}></audio>}
                <button  onClick={() => button(index)}>{isPlaying === index ? <BsFillPauseCircleFill size={25} /> : <FaCirclePlay size={25} />}</button>
            </div>
        </Link>
    ))
    return (
        <div className="lg:w-3/5 w-1/1 sticky top-0 z-10">
            
            {render.length?<p className="text-5xl font-semibold mb-5">Related Songs as your mood</p>:""}
            <div className='overflow-y-auto lg:h-[600px] sm:h-[1200px] space-y-3 rounded'>
            {render}
            </div>
        </div>

    )
}

export default Moodsongs