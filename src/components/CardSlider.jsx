import { Card } from "./Card"


export const CardSlider = ({data,title}) => {
    console.log(data)
    if (!data) {
        return <div>Loading...</div>;
    }

    const movieResults = data || []
    
    return (
        <div className="flex ">
            {
                movieResults.map((movie) => {
                    return <Card movieData={movie} key={movie.id} />
                })
            }
        </div>
    )
}
