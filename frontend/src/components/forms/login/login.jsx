import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { useForm } from "react-hook-form";
import './login.css'
function LoginForm() {
  const userState = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const {loginAdmin,loginStudent,loginTutor} = bindActionCreators(actionCreators,dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
    
    <form onSubmit={handleSubmit(onSubmit)} className="login">
      <h1>login</h1>
      <input  {...register("example",{ required: true })} />
      {errors.example && <span>User field is required</span>}
      
      <input {...register("exampleRequired", { required: true })} />
      
      {errors.exampleRequired && <span>password field is required</span>}
      
      <input type="submit" />
    </form>
    </>
    
  );
}
export default LoginForm;