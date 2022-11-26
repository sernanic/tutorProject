import React, { useState, useContext, useEffect } from "react";
import LoginForm from '../../components/forms/auth/login/login'
import loginImgPlaceHolder from '../../assets/loginAssets/loginPlaceHolderImg.png';
import { Account } from '../../components/account/Account';
import './login.css'

function Login() {

  
  
  return (
    <Account>
      <div className='loginPage'>
        <div className="loginImage" style={{ height: '100%', display: 'flex' }}>
          <img src={loginImgPlaceHolder} alt="placeholder image for login" srcSet="" />
        </div>
        <LoginForm/>
      </div>
    </Account>
    
  );
}
export default Login