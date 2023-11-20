/* eslint-disable react/prop-types */
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"

export const Header = (props) => {
  
  const navigate = useNavigate()
  return (
    <div className="Container px-[4rem] flex items-center justify-between  ">
      <div className="logo">
        <img src={logo} alt="logo" className="h-[5rem]" />
      </div>
      <button onClick={()=> navigate(props.login? "/login" : "/signup" )} className="py-[0.5rem] px-[1rem] bg-[#e50914] border-0 text-white cursor-pointer rounded-sm text-[1.05rem] font-semibold">
        {props.login ? "Log In" : "Sign In"}
      </button>

    </div>
  )
}
