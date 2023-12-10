import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import movieLogo from '../assets/homeTitle.webp';
import {FaPlay} from 'react-icons/fa'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { fetchMovies, fetchSeries, getGenres } from "../utils/reducer";
import { useStateProvider } from "../utils/StateProvider";
import {Slider} from "../components/Slider"



export const Netflix = () => {
  const [isScrolled,setIsScrolled] =useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true );
    return () => (window.onscroll = null)
  }
  const navigate = useNavigate();

  const [{movies},dispatch] = useStateProvider();


    useEffect(() => {
      const fetchData = async () => {
        try{
          await getGenres(dispatch);
          await fetchMovies(dispatch)
          await fetchSeries(dispatch)
          

        }catch(error){
          console.error(error)
        }
      }
      fetchData()
    },[dispatch])






    return (
    <div className="Container bg-black ">
      <Navbar isScrolled={isScrolled} />
      <div className="hero relative ">
        <img src={backgroundImage} alt="background" className="brightness-75 h-[100vh] w-[100vw]" />
        <div className="container absolute bottom-20 ">
          <div className="logo ">
            <img src={movieLogo} alt="Movie logo" className="w-[90%] h-[100%] mx-[3rem] " />
          </div>
          <div className="buttons flex m-[5rem] gap-8">
            <button className="flex justify-center items-center text-2xl gap-4 rounded py-2 pl-8 pr-10 border-0 cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80 bg-[rgba(109,109,110)] text-black " onClick={()=> navigate('/player')}>
              <FaPlay />Play
            </button>
            <button className="flex justify-center items-center bg-[rgba(109,109,110,0.7)] text-white text-2xl gap-4 rounded py-2 pl-8 pr-10 border-0 cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80">
              <AiOutlineInfoCircle className="text-xl"/>More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </div>
  )
}
