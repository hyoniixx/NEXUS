import "./App.css";
import { RouterProvider } from "react-router-dom";
import { NexusRouter } from './routes/NexusRouter.jsx'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import setUserData from "./reducer/userReducer.js";
import { auth } from "./firebase/config.js";
import { getUser } from "./service/UserService.js";
import { type } from "firebase/firestore/pipelines";

export const userContext = createContext();


function App() {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnapShot = await getUser(user.uid);
        console.log('!!!!!!!!!!', docSnapShot)
        dispatch({ type: 'SET_USER_DATA', payload: docSnapShot })
      } else {
        dispatch({ type: 'INIT_USER_DATA' })
      }
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);

  return (
    <userContext.Provider value={{ userData, dispatch, loading }}>
      <RouterProvider router={NexusRouter} />
    </userContext.Provider>

  );
}

export default App;
