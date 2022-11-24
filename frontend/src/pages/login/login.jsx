import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';
import LoginForm from '../../components/forms/auth/login/login'
import loginImgPlaceHolder from '../../assets/loginAssets/loginPlaceHolderImg.png';

import './login.css'

function Login() {
  
  return (
    <div className='loginPage'>
      <div className="loginImage" style={{ height: '100%', display: 'flex' }}>
        <img src={loginImgPlaceHolder} alt="placeholder image for login" srcset="" />
      </div>
      <LoginForm/>
    </div>
    
  );
}
export default Login