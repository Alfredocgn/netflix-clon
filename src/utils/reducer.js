/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL, reducerCases } from './constants';
import { useStateProvider } from './StateProvider';

export const initialState = {
  movies:[],
  genresLoaded:false,
  genres:[],

}

export const getGenres = async(dispatch) =>{
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    const {genres} = response.data;
    dispatch({type: reducerCases.SET_GENRES, payload:genres})
    return genres;
  }catch(err){
    console.error('Error fetching genres :',err)
  }

}

const createArrayFromRawData = (array,moviesArray,genres) => {
  array.forEach((movie)=>{
    const movieGenres = [];
    movie.genre_ids.forEach((genre)=>{
      const name = genres.find(({id})=> id === genre)
      if(name) movieGenres.push(name.name)
    })
  if(movie.backdrop_path){
    moviesArray.push({
      id:movie.id,
      name:movie?.original_name ? movie.original_name : movie.original_title,
      image:movie.backdrop_path,
      genres:movieGenres.slice(0,3),
    })
  }
  })
}

const getRawData = async(api,genres,paging = false) =>{
  const moviesArray = [];
  for (let i = 1;moviesArray.length < 60 && i < 10; i++){
    const {
      data:{results},
    } = await axios.get(`${api}${paging ?  `&page=${i}` : ""}`);
    createArrayFromRawData(results,moviesArray,genres);
  }
  return moviesArray;
}


export const fetchDataByGenre = async ({genre,type}) => {
  const [{ genres }, dispatch] = useStateProvider();
  try {
    const rawData = await getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
    dispatch({type:reducerCases.SET_GENRES_FROM_TYPE,payload:rawData})
    return rawData
  }catch(err){
    console.error('Error fetching data by genre :',err);
    throw err
  }
}



const reducer = (state,action) => {
  switch(action.type){
    case reducerCases.SET_GENRES:{
      return {
        ...state,
        genres:action.payload,
        genresLoaded:true
      }
    }
    case reducerCases.SET_GENRES_FROM_TYPE:{
      return {
        ...state,
        genres:action.payload,
        genresLoaded:true
      }
    }
    default:
      return state
  }
}

export default reducer;