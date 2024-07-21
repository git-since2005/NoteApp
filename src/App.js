import './App.css';
import {React} from 'react'
import Noteboard from './Components/Noteboard.js'
import { useState } from "react";
import allContext from './Contexts/Context'
import Signup from './Components/Signup'
import SignIn from './Components/SignIn'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextProvider from './Contexts/ContextProvider'

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element = {<SignIn />} />
            <Route path="/notes" element = {<Noteboard />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
