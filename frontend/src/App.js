import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Students from './pages/students';

function App() {
  return (
    <>
      <Router>
        <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/students' element={<Students/>} />
        </Routes>
        </div>
       
      </Router>
    </>
  );
}

export default App;