import React, { useEffect, useMemo, useState,useContext } from 'react'
import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';
import {AccountContext} from "../../components/account/Account"
import { useNavigate,Navigate } from 'react-router-dom';
import Login from '../login/login';

function Home() {
  const userState = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const {loginAdmin,loginStudent,loginTutor} = bindActionCreators(actionCreators,dispatch)
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  }, []);
  if(status){
    return (
    <div className='home'>
      <Sidebar/>
      <button onClick={()=> loginAdmin(100)}>Home</button> <br/>
      <button onClick={()=> loginTutor(200)}>Home for tutor</button><br/>
      <button onClick={()=> loginStudent(300)}>Home for student</button>
      <h1>{userState}</h1>
    </div>
    );
  }
  else{
    return (
       <Navigate to="/login" replace />
    )
  }
  
}
export default Home;