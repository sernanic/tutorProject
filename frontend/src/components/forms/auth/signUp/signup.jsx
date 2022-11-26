import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from "react-hook-form";
import userPool from '../userPool/userPool';
import './signup.css'
import axios from 'axios';

function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {

    axios.post("http://0.0.0.0:8000/users/create", data)
    .then(function (response) {
      console.log(data)
      console.log(response.status);
      if (response.status === 200) {
      } else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    userPool.signUp(data.email, data.password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      else{
        console.log("it worked baby")
      }
      console.log(data);
    });
    
    console.log(data)};

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
              <input  {...register("name", { required: true })} placeholder="Name" style={{ marginTop: '0.5rem' }}/>
              {errors.example && <span>User field is required</span>}
            </div>

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