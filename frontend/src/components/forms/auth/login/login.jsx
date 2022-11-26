import React, { useEffect, useMemo, useState,useContext } from 'react'
import { useForm } from "react-hook-form";
import './login.css'
import loginImgPlaceHolder from '../../../../assets/loginAssets/loginPlaceHolderImg.png';
import axios from 'axios';
import qs from 'qs';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from '../userPool/userPool';
import {AccountContext} from "../../../account/Account";
import { useNavigate } from 'react-router-dom';
import { useCurrentClientStore } from '../../../../store/useStore';
function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { authenticate } = useContext(AccountContext);
  
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  const setCurrentClient = useCurrentClientStore((state) => state.setCurrentClient)

  const navigate = useNavigate();

  const fetchUser = async (email) => {
    var fetchUrl = "http://0.0.0.0:8000/users/email/" +email
    const response = await axios.get(fetchUrl).then(function (response) {
      console.log(response["data"])
      setCurrentClient(response["data"])
    }
    ).catch((err) => console.log(err));
    if (response) {
        const students = response.data;
        console.log("Students: ", students);
    }
};

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
      console.log(status)
    });
  }, []);


  const onSubmit =  data => {
    console.log(data.email, data.password)
    authenticate(data.email, data.password)
      .then((data2) => {
        fetchUser(data.email)
        console.log("Logged in!", data2);
        navigate("/home");

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
      </div>
    </>
  );
}
export default LoginForm;