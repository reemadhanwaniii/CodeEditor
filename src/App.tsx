
import './App.css'
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';
import Description from './pages/Description/Description'
import React from 'react';
import SampleProblem1 from './constants/SampleProblem1';

function App() {

  const markdownText = SampleProblem1.problemStatement;

  return (
    <>
      <Navbar/>
      <SideBar/>
      <Description descriptionText={markdownText}/>
    </>
  )
}

export default App
