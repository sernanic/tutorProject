import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './views/home/home';
import Students from './views/students/students';
import Settings from './views/settings';
import CreateTutor from './views/createTutor'
import Login from './views/login/login';
import SignUp from './views/signUp/signup';
import User from './views/selectedUser/user'
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
          <Route path='/user' element={<User/>} />
        </Routes>
      </Router>
    </Account>
      
    </>
  );
}

export default App;