/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { fetchDataByGenre, getGenres } from "../utils/reducer";


export const SelectedGenre = ({parentType}) => {
    const [{genres},dispatch] = useStateProvider();
    const[selectedGenre,setSelectedGenre]=useState("")


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
                await fetchDataByGenre(dispatch,{genre:genreId,type:parentType})

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
