import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { BackgroundImage } from "../components/BackgroundImage"
import { Header } from "../components/Header"
import {firebaseAuth} from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"


export const Signup = () => {

  const [showPassword,setShowPassword] = useState(false)
  const [formValues,setFormValues] = useState({
    email:'',
    password:'',
  })
  const navigate = useNavigate()
  const handleSignIn = async () => {
    try{
      const {email,password}= formValues;

      await createUserWithEmailAndPassword(firebaseAuth,email,password)

    }catch(err){
      console.log(err)
    }

  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div className="Container relative " showPassword={showPassword}>
      <BackgroundImage/>
      <div className="Content absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-[100vh] w-[100vw] grid grid-rows-[15vh, 85vh ] ">
      <Header login/>
      <div className="body flex flex-col items-center gap-4  ">
        <div className="text gap-4 text-center  font-bold  flex flex-col">
          <h1 className="px-[25rem]  py-0 text-[3rem] ">Unlimited,movies TV shows and more</h1>
          <h4 className="text-[2rem]">Watch anywhere. Cancel anytime</h4>
          <h6 className="text-[1.5rem]">
            Ready to watch? Enter your email to create or restart membership
          </h6>
        </div>
        <div className={`form grid ${showPassword ? 'grid-cols-[1fr,1fr]' : 'grid-cols-[2fr,1fr]'}  w-[60%]`}>
          <input type="email" placeholder="Email Address" name="email" className="text-black text-md p-[1.5rem] border border-black focus:outline-none " value={formValues.email} 
          onChange={(e)=> setFormValues(
            {...formValues,
            [e.target.name] : e.target.value,})}/>
          {
            showPassword && (
              <input type="password" placeholder="Password" name="password" className="text-black text-md p-[1.5rem] border border-black focus:outline-none " value={formValues.password}  onChange={(e)=> setFormValues(
                {...formValues,
                [e.target.name] : e.target.value,})}/>

            )
          }
          {
            !showPassword && (
              <button onClick={()=> setShowPassword(true)} className="py-[0.5rem] px-[1rem] bg-[#e50914] border-0 text-white cursor-pointer rounded-sm text-[1.05rem] font-semibold">Get Started</button>
            )
          }
        </div>
        {
          showPassword && (

            <button onClick={handleSignIn} className="py-[0.5rem] px-[1rem] bg-[#e50914] border-0 text-white cursor-pointer rounded-sm text-[1.05rem] font-semibold">Sign Up</button>
          )
        }
      </div>

      </div>
    </div>
  )
}
