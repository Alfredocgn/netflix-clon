
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDnAjVrL1Td-9TwyyFTHE6XHw-dfQ-MKqk",
  authDomain: "react-netflix-clone-de9f1.firebaseapp.com",
  projectId: "react-netflix-clone-de9f1",
  storageBucket: "react-netflix-clone-de9f1.appspot.com",
  messagingSenderId: "744894463607",
  appId: "1:744894463607:web:3a3717cb013623527d5072",
  measurementId: "G-53YH46Q88D"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
