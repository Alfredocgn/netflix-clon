

export const CardSlider = ({data,title}) => {
    const algo = data
    const algo2 = data.results[0].title
    console.log(algo2)
    return (
        <div>
            {/* {
                algo2.map((movie,index)=>{
                    return <Card movieData={movie} key={movie.id}  />
                })
            } */}
        </div>
    )
}
