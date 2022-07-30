import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';
import LoginForm from '../../components/forms/login/login'

import './login.css'
function Login() {
  
  return (
    <div className='loginPage'>
      <LoginForm/>
    </div>
    
  );
}
export default Login;