import axios from 'axios';
import { API_KEY, TMDB_BASE_URL, reducerCases } from './constants';

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
  }catch(err){
    console.error('Error fetching genres :',err)
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
    default:
      return state
  }
}

export default reducer;