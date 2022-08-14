import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/index';
import { useForm } from "react-hook-form";
import './signup.css'
function SignUpForm() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { loginAdmin, loginStudent, loginTutor } = bindActionCreators(actionCreators, dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
      <div className="signUpFormContainer">
        <form onSubmit={handleSubmit(onSubmit)} className="signup">
          <div className="formTitle">
            <h1>Sign Up</h1>
          </div>
          <div className="formInputs">
            <div>
              <input  {...register("email", { required: true })} placeholder="Email" style={{ marginTop: '0.5rem' }}/>
              {errors.example && <span>User field is required</span>}
            </div>

            <div>
              <input  {...register("username", { required: true })} placeholder="Username" style={{ marginTop: '0.5rem' }}/>
              {errors.example && <span>User field is required</span>}
            </div>

            <div>
              <input {...register("password", { required: true })} placeholder="Password" style={{ marginTop: '0.5rem' }}/>
              {errors.exampleRequired && <span>password field is required</span>}
            </div>

            <div>
              {/* TODO: better placeholder name for this input  */}
              <input {...register("passwordCheck", { required: true })} placeholder="PasswordCheck" style={{ marginTop: '0.5rem' }}/>
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
export default SignUpForm;