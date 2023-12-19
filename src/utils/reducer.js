/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL, reducerCases } from './constants';


export const initialState = {
  movies:[],
  genres:[],
  likedMovies:[],
  series:[],


}


export const getGenres = async(dispatch) =>{
  try{
    const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    const response = await axios.get(url);
    const {data} = response;
    const genres = data.genres || []

    dispatch({type:reducerCases.SET_GENRES,payload:genres})
    return genres
  }catch(err){
    console.error("Error fetching genres:",err)
  }
}

const createArrayFromRawData=(array,moviesArray,genres) => {
  array.forEach((movie)=>{
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({id})=> id === genre);
      if (name) movieGenres.push(name.name)
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




export const fetchMovies = async (dispatch) => {
  try {
    const genres = await getGenres(dispatch)
    const url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    const moviesArray = await getRawData(url,genres,true)
  
    dispatch({type:reducerCases.SET_MOVIES,payload:moviesArray})
    return moviesArray
  }catch(err){
    console.error('Error fetching movies :',err);
    throw err;
  }
}
export const fetchSeries = async (dispatch) => {
  try {
    const genres = await getGenres(dispatch)
    const url = `${TMDB_BASE_URL}/trending/tv/week?api_key=${API_KEY}`
    const seriesArray = await getRawData(url,genres,true)
  
    dispatch({type:reducerCases.SET_SERIES,payload:seriesArray})
    return seriesArray
  }catch(err){
    console.error('Error fetching series :',err);
    throw err;
  }
}
const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMoviesByGenre = async (dispatch,{genre}) => {
  try{
    const genres = await getGenres(dispatch)
    const url =`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
    const moviesArray = await getRawData(url,genres)
    dispatch({type:reducerCases.SET_MOVIES,payload:moviesArray})
    return moviesArray

  }catch(err){
    console.error("Error ",err)
    throw err
  }

}
export const fetchSeriesByGenre = async (dispatch,{genre}) => {
  try{
    const genres = await getGenres(dispatch)
    const url =`${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre}`
    const seriesArray = await getRawData(url,genres)
    dispatch({type:reducerCases.SET_SERIES,payload:seriesArray})
    return seriesArray

  }catch(err){
    console.error("Error ",err)
    throw err
  }

}

export const getUserLikedMovies = async (dispatch,{email}) => {
  try{
    console.log(email)
    const response = await axios.get(`http://localhost:5000/api/user/liked/${email}`)
    const {likedMovies} = response.data
    dispatch({type:reducerCases.SET_LIKED_MOVIES,payload:likedMovies})
    console.log(likedMovies)
    return likedMovies
  }catch(error){
    console.error(error)
    throw error
  }
}

const reducer = (state,action) => {
  switch(action.type){
    case reducerCases.SET_GENRES:{
      return {
        ...state,
        genres:action.payload,
      }

    }
    case reducerCases.SET_MOVIES:{
      return{
        ...state,
        movies:action.payload,
      }
    }
    case reducerCases.SET_LIKED_MOVIES:{
      return{
        ...state,
        likedMovies:action.payload
        
      }
    }
    case reducerCases.SET_SERIES:{
      return {
        ...state,
        series:action.payload
      }
    }

    default:
      return state
  }
}

export default reducer;