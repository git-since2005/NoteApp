import './App.css';
import {React, Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const SignIn = lazy(()=>import('./Components/SignIn'))
const Signup = lazy(()=>import('./Components/Signup'))
const Noteboard = lazy(()=>import('./Components/Noteboard.js'))
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<p>Loading...</p>}><Signup /></Suspense>} />
              <Route path="/signin" element = {<Suspense fallback={<p>Loading...</p>}><SignIn /></Suspense>} />
            <Route path="/notes" element = {<Suspense fallback={<p>Loading...</p>}><Noteboard /></Suspense>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
