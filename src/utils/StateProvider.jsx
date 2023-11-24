/* eslint-disable react/prop-types */
import { createContext,useContext,useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({children,initialState,reducer}) => (
  <StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
  </StateContext.Provider>
)

// eslint-disable-next-line react-refresh/only-export-components
export const useStateProvider = () => useContext(StateContext);