/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { fetchMoviesByGenre, fetchSeriesByGenre, getGenres } from "../utils/reducer";
import { useLocation } from "react-router-dom";


export const SelectedGenre = () => {
    const [{genres},dispatch] = useStateProvider();
    const[selectedGenre,setSelectedGenre]=useState("")
    const location = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            try{
                // eslint-disable-next-line no-unused-vars
                const genresData  = await getGenres(dispatch);
            

            }catch(error){
                console.error(error)
            }
        }
        fetchData()
        },[dispatch])

        const handleGenreChange= async (event) =>{
            
            const genreId = event.target.value
            setSelectedGenre(genreId)
            try{
                const currentPath = location.pathname
                if(currentPath === "/movies"){
                    await fetchMoviesByGenre(dispatch,{genre:genreId})
                }else if (currentPath === "/tv"){
                    await fetchSeriesByGenre(dispatch,{genre:genreId})
                }

            }catch(error){
                console.error
            }
        }
        
    return (
        <select className=" ml-[5rem] cursor-pointer text-md bg-[rgba(0,0,0,0.4)] text-white" value={selectedGenre} onChange={handleGenreChange}>
            <option value={""} disabled>Select Genre</option>
            {
                genres.map((genre) => {
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
