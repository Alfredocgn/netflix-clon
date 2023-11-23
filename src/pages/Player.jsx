import {BsArrowLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import video from '../assets/video.mp4'

export const Player = () => {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='player w-[100vw] h-[100vh]'>
        <div className='back absolute p-8 z-10 '>
          <BsArrowLeft className='cursor:pointer text-5xl' onClick={() => navigate(-1)}/>
        </div>
        <video src={video} autoPlay loop controls muted className='h-[100%] w-[100%] object-cover'></video>
      </div>
    </div>
  )
}
