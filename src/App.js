import './App.css';
import {React, Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const logo = lazy(()=>import('./Images/loading.png'))
const SignIn = lazy(()=>import('./Components/SignIn'))
const Signup = lazy(()=>import('./Components/Signup'))
const Noteboard = lazy(()=>import('./Components/Noteboard.js'))
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><Signup /></Suspense>} />
              <Route path="/signin" element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><SignIn /></Suspense>} />
            <Route path="/notes" element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Fetching Details...</p>}><Noteboard /></Suspense>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
