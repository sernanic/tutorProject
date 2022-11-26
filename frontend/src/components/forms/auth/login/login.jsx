import React, { useEffect, useMemo, useState,useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/index';
import { useForm } from "react-hook-form";
import './login.css'
import loginImgPlaceHolder from '../../../../assets/loginAssets/loginPlaceHolderImg.png';
import axios from 'axios';
import qs from 'qs';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from '../userPool/userPool';
import {AccountContext} from "../../../account/Account";

function LoginForm() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { loginAdmin, loginStudent, loginTutor } = bindActionCreators(actionCreators, dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [resStatus, setResStatus] = useState("");
  const { authenticate } = useContext(AccountContext);
  
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);


  const onSubmit =  data => {
    console.log(data.email, data.password)
    authenticate(data.email, data.password)
      .then((data) => {
        console.log("Logged in!", data);
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
    };

  return (
    <>
      <div className="loginFormContainer">
        <form onSubmit={handleSubmit(onSubmit)} className="login">
          <div className="formTitle">
            <h1>Sign In</h1>
          </div>
          <div className="formInputs">
            <div>
              <h5 style={{ marginLeft: '1rem' }}>Username</h5>
              <input  {...register("email", { required: true })} placeholder="Username" style={{ marginTop: '0.5rem' }} />
              {errors.example && <span>User field is required</span>}
            </div>

            <div>
              <h5 style={{ marginLeft: '1rem' }}>Password</h5>
              <input {...register("password", { required: true })} placeholder="Password" style={{ marginTop: '0.5rem' }} />
              {errors.exampleRequired && <span>password field is required</span>}
            </div>
          </div>
          <div className="submitButton">
            <input type="submit" />
          </div>
        </form>
        {status ? "you aree logged in" : "Please login"}

      </div>
    </>
  );
}
export default LoginForm;