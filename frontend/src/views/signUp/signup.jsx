import React from 'react';
import SignUpForm from '../../components/forms/auth/signUp/signup'
import loginImgPlaceHolder from '../../assets/loginAssets/loginPlaceHolderImg.png';

import './signup.css'
function SignUp() {
  return (
    <div className='signUpPage'>
      <div className="loginImage" style={{ height: '100%', display: 'flex' }}>
        <img src={loginImgPlaceHolder} alt="placeholder image for login" srcSet="" />
      </div>
      <SignUpForm/>
    </div>
  );
}
export default SignUp;