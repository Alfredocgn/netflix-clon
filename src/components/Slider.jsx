import React from "react"
import {CardSlider} from "./CardSlider"



export const Slider = React.memo(({movies}) => {
        const getMoviesFromRange = (from,to) =>{
            return movies.slice(from,to)
        }
        return (
            <div>
                <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)} />
                <CardSlider title="New Releases" data={getMoviesFromRange(10,20)} />
            </div>
        )
    }

) 
