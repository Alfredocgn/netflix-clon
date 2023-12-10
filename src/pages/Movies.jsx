
import { fetchMovies} from "../utils/reducer";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { NotAvailable } from "../components/NotAvailable";
import { Slider } from "../components/Slider";
import { SelectedGenre } from "../components/SelectedGenre";

export const Movies = () => {
    const [isScrolled,setIsScrolled] =useState(false);
    window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true );
    return () => (window.onscroll = null)
    }

    const [{movies},dispatch] = useStateProvider();





    useEffect(() => {
        const fetchData = async () => {
            try{
                await fetchMovies(dispatch)
            }catch(error){
                console.error(error)
            }
            }
            fetchData()
        },[dispatch])

    return (
        <div className="Container ">
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data mt-32">
                <SelectedGenre/>
                {
                    movies.length ? <Slider movies={movies} /> : <NotAvailable/>
                }
            </div>
        </div>

    )
}
