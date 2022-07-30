import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';

function Home() {
  const userState = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const {loginAdmin,loginStudent,loginTutor} = bindActionCreators(actionCreators,dispatch)

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
export default Home;