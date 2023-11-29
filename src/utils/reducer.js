/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL, reducerCases } from './constants';


export const initialState = {
  movies:[],
  genresLoaded:false,
  genres:[],

}


export const getGenres = async(dispatch) =>{
  try{
    const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    const response = await axios.get(url);
    const {data} = response;

    dispatch({type:reducerCases.SET_GENRES,payload:data})
    return data
  }catch(err){
    console.error("Error fetching genres:",err)
  }
}


export const fetchMovies = async (dispatch) => {
  try {
    const url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    const response = await axios.get(url)
    const {data} = response
    dispatch({type:reducerCases.SET_MOVIES,payload:data})
    return data
  }catch(err){
    console.error('Error fetching movies :',err);
    throw err;
  }
}

export const fetchDataByTypeAndGenre = async(type ='movie',genreId,dispatch) => {
  try {
    const url = `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}`
    const response = await axios.get(url)
    const data = response.data
    dispatch({type:reducerCases.SET_TYPE_WITH_GENRE,payload:data})
    return data

  }catch(err){
    console.error("Error fetching with genre :",err)
    throw err;
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
    case reducerCases.SET_MOVIES:{
      return{
        ...state,
        movies:action.payload,
      }
    }
    case reducerCases.SET_TYPE_WITH_GENRE:{
      return {
        ...state,
        typeWithGenre: action.payload
      }
    }
    default:
      return state
  }
}

export default reducer;