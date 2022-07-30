import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Students from './pages/students/students';
import Settings from './pages/settings';
import CreateTutor from './pages/createTutor'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/createTutor' element={<CreateTutor/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;