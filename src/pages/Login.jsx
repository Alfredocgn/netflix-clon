import { useState } from "react"
import { BackgroundImage } from "../components/BackgroundImage"
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { Header } from "../components/Header";

export const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate()


  const handleLogin = async() => {
    try {
      await signInWithEmailAndPassword(firebaseAuth,email,password)

    }catch(err){
      console.log(err)
    }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })
  return (
    <div className="Container relative">
      <BackgroundImage/>
      <div className="content absolute top-0 left-0 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] grid-rows-[15vh,85vh]">
        <Header/>
        <div className="form-container flex flex-col items-center justify-center gap-8 h-[85vh] ">
          <div className="form flex flex-col items-center justify-center p-8 bg-[#000000b0] w-[25vw] gap-8 text-white ">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex flex-col items-center gap-8">
              <input className="py-2 px-4 w-[15rem] text-black" type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input className="py-2 px-4 w-[15rem] text-black" type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <button onClick={handleLogin} className="px-4 py-2 bg-[#e50914] border-0 cursor-pointer w-[15rem] text-white rounded-sm font-bold text-[1.05rem]" >Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
