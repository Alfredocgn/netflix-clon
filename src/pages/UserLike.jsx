import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { getUserLikedMovies } from "../utils/reducer";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";


export const UserLike = () => {
  const [isScrolled,setIsScrolled] =useState(false);
  const [email,setEmail] = useState(undefined)
  window.onscroll = () => {
  setIsScrolled(window.scrollY === 0 ? false : true );
  return () => (window.onscroll = null)
  }

  const navigate = useNavigate()

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(firebaseAuth,(currentUser) => {
      if (currentUser) {
          setEmail(currentUser.email)
      }else navigate("/login")
  }) 
  return () => unsubscribe();
  },[navigate])

  

  const [dispatch,{likedMovies}] = useStateProvider();


useEffect(() => {
  const fetchData = async() => {
    if(email){
      try{
        console.log("email 1",email)
        await getUserLikedMovies(dispatch,{email})

      }catch(error){
        console.log(error)
      }
    }
  }
  fetchData()
},[dispatch,email])

  return (

    <div className="Container">
      <Navbar isScrolled={isScrolled}/>
      <div className="content flex flex-col m-[2.3rem] mt-32 gap-[3rem]  ">
        <h1 className="ml-[3rem]">My List</h1>
        <div className=" flex flex-wrap gap-4">
          {
            likedMovies.map((movie,index) => {
              return(
                <Card 
                movieData ={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}
