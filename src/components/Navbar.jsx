/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'
import {FaSearch,FaPowerOff} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
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

  return (
    <div className="Container">
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex items-center">
          <div className="brand flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className='links flex'>
            {
              links.map(({name,link})=>{
                return(
                  <li key={name}><Link to={link}>{name}</Link></li>
                )
              })
            }

          </ul>
        </div>
        <div className="right flex  items-center">
          <div className={`search ${showSearch ? "show-search":""}`}>
            <button onFocus={()=> setShowSearch(true)} onBlur={()=>{
              if(!inputHover) {setShowSearch(false)}
            }}>
              <FaSearch/>
            </button>
            <input type="text" placeholder='Search' onMouseEnter={()=> setInputHover(true)} onMouseLeave={()=> setInputHover(false)} onBlur={()=>{
              setShowSearch(false);
              setInputHover(false);
            }} />
          </div>
          <button onClick={()=>signOut(firebaseAuth)}>
            <FaPowerOff/>
          </button>
        </div>
      </nav>
      
    </div>
  )
}
