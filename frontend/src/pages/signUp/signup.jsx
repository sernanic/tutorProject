import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/index';
import SignUpForm from '../../components/forms/auth/signUp/signup'

import './signup.css'
function SignUp() {
  
  return (
    <div className='signUpPage'>
      <SignUpForm/>
    </div>
  );
}
export default SignUp;