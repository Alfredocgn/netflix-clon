/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Card } from "./Card"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export const CardSlider = ({data,title}) => {
    const [showControls,setShowControls]=useState(false)
    const[sliderPosition,setSliderPosition]=useState(0)
    const listRef = useRef()

    if (!data) {
        return <div>Loading...</div>;
    }

    const movieResults = data || []
    
    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if(direction === "left" && sliderPosition > 0){
            listRef.current.className +=("translate-x-230")
            setSliderPosition(sliderPosition - 1)
        }
        if(direction === "right" && sliderPosition < 4){
            listRef.current.className +=("translate-x--230")
            setSliderPosition(sliderPosition + 1)
        }
    }
    console.log(listRef)
    return (
        
        <div className="Container flex flex-col gap-4 relative py-8 px-0 " onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
            <h1 className="ml-[15px]">{title}</h1>
            <div className="wrapper">
                    <div className={`slider-action cursor-pointer left-0 left  ${showControls ? "none" : ""} flex items-center justify-center absolute z-100 h-[100%] top-5 bottom-0 w-[50px] transition-all duration-300 ease-in-out `}>
                        <AiOutlineLeft className="text-xl" onClick={()=> handleDirection("left")}/>
                    </div>
                <div className="flex slider w-max gap-4 translate-x-0 transition-all duration-300 ease-in-out ml-[50px] " ref={listRef}>
                {
                    movieResults.map((movie) => {
                        return <Card movieData={movie} key={movie.id} />
                    })
                }
                </div>
                <div className={`slider-action right cursor-pointer right-0 ${showControls ? "none" : ""} flex items-center justify-center absolute z-100 h-[100%] top-5 bottom-0 w-[50px] transition-all duration-300 ease-in-out `}>
                        <AiOutlineRight className="text-xl" onClick={()=> handleDirection("right")}/>
                    </div>
            </div>
        </div>
    )
}
