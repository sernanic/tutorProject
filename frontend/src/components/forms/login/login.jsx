import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { useForm } from "react-hook-form";
import './login.css'
import loginImgPlaceHolder from '../../../assets/loginAssets/loginPlaceHolderImg.png';

function LoginForm() {
  const userState = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const {loginAdmin,loginStudent,loginTutor} = bindActionCreators(actionCreators,dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>

    <div className="loginImage" style={{height: '100%',display:'flex'}}>
      <img src={loginImgPlaceHolder} alt="placeholder image for login" srcset="" />
    </div>
    <div className="loginFormContainer">
       <form onSubmit={handleSubmit(onSubmit)} className="login">
      <div className="formTitle">
        <h1>Sign In</h1>
      </div>
      <div className="formInputs">
        <div>
        <h5 style={{ marginLeft: '1rem' }}>Username</h5>
        <input  {...register("example",{ required: true })} placeholder="Username" style={{ marginTop: '0.5rem' }}/>
        {errors.example && <span>User field is required</span>}
        </div>
        
        <div>
        <h5 style={{ marginLeft: '1rem' }}>Password</h5>
        <input {...register("exampleRequired", { required: true })} placeholder="Password" style={{marginTop: '0.5rem' }}/>
        {errors.exampleRequired && <span>password field is required</span>}
        </div>
      </div>
      <div className="submitButton">
      <input type="submit" />
      </div>
     
    </form>
    </div>
   
    </>
    
  );
}
export default LoginForm;