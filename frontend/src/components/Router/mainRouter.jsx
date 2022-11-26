import React, { useEffect, useMemo, useState,useContext } from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from "../../pages/home/home"
import Students from "../../pages/students/students";
import Settings from "../../pages/settings"
import CreateTutor from '../../pages/createTutor'
import Login from '../../pages/login/login';
import SignUp from '../../pages/signUp/signup';
import {AccountContext} from "../../components/account/Account"

const PrivateRoute = ({ component, ...options }) => {

    const [status, setStatus] = useState(false);
    const finalComponent = status ? component : Login;
    const { getSession, logout } = useContext(AccountContext);
  
    useEffect(() => {
      getSession().then((session) => {
        setStatus(true);
        finalComponent = status ? component : Login;
      });
    }, []);
  
    return <Route {...options} component={finalComponent} />;
  };


const MainRouter = () => (

 
         <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <PrivateRoute path='/home' element={<Home/>} />
            <PrivateRoute path='/createTutor' element={<CreateTutor/>} />
            <PrivateRoute path='/students' element={<Students/>} />
            <PrivateRoute path='/settings' element={<Settings/>} />
        </Routes>
  
   
);
export default MainRouter