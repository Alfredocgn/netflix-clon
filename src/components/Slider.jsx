import { CardSlider } from "./CardSlider"


export const Slider = ({movies}) => {



    // const getMoviesFromRange  =(from,to) =>{
    //     return movies.slice(from,to)
    // }


    return (
        <div>
            <CardSlider title="Trending Now" data={movies} />
            <CardSlider title="New Releases" data={movies}  />
            <CardSlider title="Blockbuster Movies" data={movies}/>
            <CardSlider title="Popilar On Netflix" data={movies} />
            <CardSlider title="Action Movies"  data={movies}/>
            <CardSlider title="Epics Movies"data={movies}/>
        </div>
    )
}
