import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/index';
import { useForm } from "react-hook-form";
import './signup.css'
function SignUpForm() {
  const userState = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const {loginAdmin,loginStudent,loginTutor} = bindActionCreators(actionCreators,dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
    
    <form onSubmit={handleSubmit(onSubmit)} className="signup">
      <h1>Sign Up</h1>
      <input  {...register("email",{ required: true })} />
      {errors.example && <span>User field is required</span>}

      <input  {...register("username",{ required: true })} />
      {errors.example && <span>User field is required</span>}
      
      <input {...register("password", { required: true })} />
      {errors.exampleRequired && <span>password field is required</span>}

      <input {...register("passwordCheck", { required: true })} />
      {errors.exampleRequired && <span>password field is required</span>}
      
      <input type="submit" />
    </form>
    </>
    
  );
}
export default SignUpForm;