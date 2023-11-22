import { useState } from "react"
import { Navbar } from "../components/Navbar";


export const Netflix = () => {
  const [isScrolled,setIsScrolled] =useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true );
    return () => (window.onscroll = null)
  }
    return (
    <div className="Container">
      <Navbar isScrolled={isScrolled} />
    </div>
  )
}
