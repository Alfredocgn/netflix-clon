/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'
import {FaSearch,FaPowerOff} from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

export const Navbar = ({isScrolled}) => {
  const [showSearch,setShowSearch]=useState(false);
  const [inputHover,setInputHover]=useState(false);
  const links = [
    {name:"Home",link:"/"},
    {name:"TV Shows",link:"/tv"},
    {name:"Movies",link:"/movies"},
    {name:"My List",link:"/mylist"},
  ]
  const navigate = useNavigate()

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate("/login")
  })

  return (
    <div className="Container bg-black ">
      <nav className={` fixed top-0 h-[6.5rem] w-full justify-between z-10 py-0 px-[4rem] duration-300 ease-in-out    flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex items-center gap-8">
          <div className="brand flex items-center justify-center">
            <img src={logo} alt="logo"  className='h-[4rem]'/>
          </div>
          <ul className='links flex gap-8 '>
            {
              links.map(({name,link})=>{
                return(
                  <li key={name}><Link className='text-white' to={link}>{name}</Link></li>
                )
              })
            }

          </ul>
        </div>
        <div className="right flex  items-center gap-4">
          <div className={`flex gap-2 items-center justify-center p-1 pl-2  search ${showSearch ? "show-search":""}`}>
            <button className='bg-transparent border-0 cursor-pointer focus:outline-none ' onFocus={()=> setShowSearch(true)} onBlur={()=>{
              if(!inputHover) {setShowSearch(false)}
            }}>
              <FaSearch className='text-white text-xl'/>
            </button>
            <input className={`w-0 opacity-0 hidden transition-all duration-300 ease-in-out bg-transparent border-0 text-white focus:outline-none `} type="text" placeholder='Search' onMouseEnter={()=> setInputHover(true)} onMouseLeave={()=> setInputHover(false)} onBlur={()=>{
              setShowSearch(false);
              setInputHover(false);
            }} />
          </div>
          <button className='bg-transparent border-0 cursor-pointer focus:outline-none ' onClick={()=>signOut(firebaseAuth)}>
            <FaPowerOff className='text-[#f34242] text-xl'/>
          </button>
        </div>
      </nav>
      
    </div>
  )
}
