/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {Card} from "./Card"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export const CardSlider = React.memo(({data,title}) => {
        const [showControls,setShowControls]=useState(false)
        const[currentIndex,setCurrentIndex]=useState(0)


        if (!data) {
            return <div>Loading...</div>;
        }

        const movieResults = data || []
        const totalCards = movieResults.length
        const duplicateCards = [...movieResults,...movieResults]
        
        const nextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards)
            console.log("next index",currentIndex)
        }
    
        const prevSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards ) % totalCards)
            console.log("prev index",currentIndex)
        }
    
        useEffect(()=> {
            if(currentIndex > totalCards ){
                setCurrentIndex(0)
    
            }if(currentIndex < 0){
                setCurrentIndex(9)
            }
        },[currentIndex,totalCards])
    
        return (
            
            <div className="Container flex flex-col gap-4 relative py-8 px-0 " onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
                <h1 className="ml-[15px] text-3xl">{title}</h1>
                <div className="wrapper">
                        <div className={`slider-action cursor-pointer left-0 left  ${showControls ? "none" : ""} flex items-center justify-center absolute z-10 h-[100%] top-5 bottom-0 w-[50px] transition-all duration-300 ease-in-out `}>
                            <AiOutlineLeft className="text-3xl" onClick={prevSlide}/>
                        </div>
                    <div className={`flex slider w-max gap-4  transition-all duration-300 ease-in-out ml-[50px] `} >
                    {
                        duplicateCards.map((movie,index) => {
                            return (
                                <div key={index} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    <Card movieData={movie} />    
                                </div>
    
                        )
                        })
                    }
                    </div>
                    <div className={`slider-action right cursor-pointer right-0 ${showControls ? "none" : ""} flex items-center justify-center absolute z-10 h-[100%] top-5 bottom-0 w-[50px] transition-all duration-300 ease-in-out `}>
                            <AiOutlineRight className="text-3xl" onClick={nextSlide}/>
                    </div>
                </div>
            </div>
        )
    }

)
