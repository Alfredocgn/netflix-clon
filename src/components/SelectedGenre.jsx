import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { getGenres } from "../utils/reducer";


export const SelectedGenre = () => {
    const [{genres},dispatch] = useStateProvider();
    const[selectedGenre,setSelectedGenre]=useState("")


    useEffect(() => {
        const fetchData = async () => {
            try{
                const genresData  = await getGenres(dispatch);
            

            }catch(error){
                console.error(error)
            }
        }
        fetchData()
        },[dispatch])

        const handleGenreChange=(event) =>{
            setSelectedGenre(event.target.value)
        }
        
    return (
        <select className="text-black bg-white" value={selectedGenre} onChange={handleGenreChange}>
            <option value={""} disabled>Select Genre</option>
            {
                genres.map((genre) => {
                    console.log(genre.name)
                    return (
                        <option value={genre.id} key={genre.id} >
                            {genre.name}
                        </option>
                    )
                })
            }
        </select>
    )
}
