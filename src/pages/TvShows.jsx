import { useStateProvider } from "../utils/StateProvider";
import {  useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { NotAvailable } from "../components/NotAvailable";
import { Slider } from "../components/Slider";
import { SelectedGenre } from "../components/SelectedGenre";
import { fetchSeries } from "../utils/reducer";

export const TvShows = () => {
    const [isScrolled,setIsScrolled] =useState(false);
    window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true );
    return () => (window.onscroll = null)
    }
    // const navigate = useNavigate();        

    const [{series},dispatch] = useStateProvider();

    useEffect(() => {

        const fetchData = async () => {
            try{
                await fetchSeries(dispatch)   
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
                <SelectedGenre />
                {
                    series.length ? <Slider movies={series} /> : <NotAvailable/>
                }
            </div>
        </div>

    )
}
