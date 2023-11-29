import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import movieLogo from '../assets/homeTitle.webp';
import {FaPlay} from 'react-icons/fa'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { fetchDataByTypeAndGenre, fetchMovies, getGenres } from "../utils/reducer";
import { useStateProvider } from "../utils/StateProvider";
import { API_KEY, TMDB_BASE_URL, reducerCases } from "../utils/constants";


export const Netflix = () => {
  const [isScrolled,setIsScrolled] =useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true );
    return () => (window.onscroll = null)
  }
  const navigate = useNavigate();

  const [{genres,movies,typeWithGenre},dispatch] = useStateProvider();


    useEffect(()=> {
        getGenres(dispatch)
        .then(genresData => {
          console.log("Genres:",genresData)
        }).catch(error => {
          console.error(error)
        })
      


    },[dispatch])

    useEffect(()=>{
      fetchMovies(dispatch).then(moviesData => {
        console.log("Movies:",moviesData.results)
      }).catch(error => {
        console.error(error)
      })
    },[dispatch])

    useEffect(()=>{
      fetchDataByTypeAndGenre("movie",28,dispatch).then(typeData => {
        console.log("Movie type:",typeData.results)
      }).catch(error => {
        console.error(error)
      })
    },[dispatch])



    return (
    <div className="Container bg-black ">
      <Navbar isScrolled={isScrolled} />
      <div className="hero relative ">
        <img src={backgroundImage} alt="background" className="brightness-75 h-[100vh] w-[100vw]" />
        <div className="container absolute bottom-20 ">
          <div className="logo ">
            <img src={movieLogo} alt="Movie logo" className="w-[100%] h-[100%] mx-[3rem] " />
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
    </div>
  )
}
