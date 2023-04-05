import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Outlet} from "react-router-dom";
import Homepage from './components/homepage/homepage'
import Card from './components/Quadratic/Quadratic'
import Probability from './components/Binomial/Binomial';
import Poisson from './components/poisson/poisson';
import Normal from './components/NormalDistribution/Normal';
import ChiSquared from './components/ChiSquared/ChiSquared';

function App() {

  return (
    <>

   <Router>
          
          <Outlet/>
          <Routes>
                <Route path= "/" element={<Homepage/>} exact/>
                <Route path="Quadratic" element={<Card />} exact/>
                <Route path="Pos" element={<Probability/>} exact/>
                <Route path="Poisson" element={<Poisson/>} exact/>
                <Route path="Normal" element={<Normal/>} exact/>
                <Route path="ChiSquared" element={<ChiSquared/>} exact/>
           </Routes>
        </Router>
  
    </>
    
  )
}

export default App
