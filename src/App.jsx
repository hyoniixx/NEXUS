import "./App.css";
import { RouterProvider } from "react-router-dom";
import { NexusRouter } from './routes/NexusRouter.jsx'
import React, { createContext, useEffect, useReducer } from 'react'
import setUserData from "./reducer/userReducer.js";
import { auth } from "./firebase/config.js";

export const userContext = createContext();


function App() {
  const [userData, dispatch] = useReducer(setUserData, {
    userName: "",
    email: "",
    birthDate: "",
    profileImage: null,
    role: "",
    isBlacklist: false,
    csScore: 0,
    csScoreMax: 0,
    csGrade: 0,
    lectures: [],
    wish: [],
    createAt: '',
  })



  return (
    <userContext.Provider value={{ userData, dispatch }}>
      <RouterProvider router={NexusRouter} />
    </userContext.Provider>

  );
}

export default App;
