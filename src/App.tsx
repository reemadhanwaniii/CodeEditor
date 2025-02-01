
import './App.css'
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';
import Description from './pages/Description/Description'
import React from 'react';
import SampleProblem1 from './constants/SampleProblem1';
import { Route,Routes } from 'react-router-dom';
import ProblemList from './pages/ProblemList/ProblemList';

function App() {

  const markdownText = SampleProblem1.problemStatement;

  return (
    <>
      <Navbar/>
      <SideBar/>
      <Routes>
        <Route path='/problems/list' element={<ProblemList/>}/>
        <Route path='/problem' element={<Description descriptionText={markdownText}/>}/>
      </Routes>
      {/* <Description descriptionText={markdownText}/> */}
    </>
  )
}

export default App
