import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Students from './pages/students/students';
import Settings from './pages/settings';
import CreateTutor from './pages/createTutor'
import Login from './pages/login/login';
import SignUp from './pages/signUp/signup';
import {Account} from "./components/account/Account"
function App() {
  return (
    <>
    <Account>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/createTutor' element={<CreateTutor/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </Router>
    </Account>
      
    </>
  );
}

export default App;