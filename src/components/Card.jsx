/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import video from '../assets/video.mp4'
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbDownFill,RiThumbUpFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"

export const Card = ({movieData,isLiked =false}) => {
    const [isHovered,setIsHovered] = useState(false)
    const navigate = useNavigate()
    return (
        <div className='Container w-[230px] h-[100%] max-w-[230px] cursor-pointer relative ' onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}>
            <img className='rounded-md w-[100%] h-[100%] z-10 ' src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="poster" />
            {
                isHovered && (
                    <div className='hover z-40 h-max w-[20rem] absolute top-[-18vh] left-0  rounded-md bg-[#181818] transition-all ease-in-out duration-300 '>
                        <div className='image-container relative h-[140px] w-full'>
                            <img className='w-[100%] h-[140px] bg-cover rounded-md top-0 z-30 absolute' src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie " onClick={() => navigate("/player")}/>
                            <video className='w-full h-[140px] rounded-md top-0 z-50 absolute' src={video} autoPlay loop muted onClick={() => navigate("/player")} />

                        </div>
                        <div className="info-container flex flex-col p-4 gap-2">
                            <h3 className='name' onClick={()=> navigate("/player")}>{movieData.name}</h3>
                            <div className='icons flex justify-between '>
                                <div className='controls flex gap-4'>
                                    <IoPlayCircleSharp className='text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title="play" onClick={()=> navigate("/player")}/>
                                    <RiThumbUpFill className='text-md cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title="Like"/>
                                    <RiThumbDownFill className='text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title="Dislike"/>
                                    {
                                        isLiked ? (
                                            <BsCheck className='text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title="Remove from list"/> ) : (
                                            <AiOutlinePlus className='text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title="Add to list"/>
                                        )
                                    }
                                </div>
                                <div className='info  '>
                                    <BiChevronDown className='text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#b8b8b8]' title='More info'/>

                                </div>
                            </div>
                            <div className='genres flex'>
                                <ul className='flex gap-4 '>
                                    {
                                        movieData.genres.map((genre)=>{
                                            return <li className='pr-3' key={genre}>{genre}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}
