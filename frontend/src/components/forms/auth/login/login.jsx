import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/index';
import { useForm } from "react-hook-form";
import './login.css'
import loginImgPlaceHolder from '../../../../assets/loginAssets/loginPlaceHolderImg.png';
import axios from 'axios';
import qs from 'qs';
function LoginForm() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { loginAdmin, loginStudent, loginTutor } = bindActionCreators(actionCreators, dispatch)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [resStatus, setResStatus] = useState("");
  const onSubmit =  data => {
    
    const url = "http://127.0.0.1:8000/token";




   



        


        // we have to use formData cause we are expecting OAuth2PasswordRequestForm
        // in the backend
        const form_data = new FormData()

        form_data.append("email", data.email)
        form_data.append("password", data.password)
        form_data.append("username", data.email)
        form_data.append("name", "sss")

        axios.post(url, form_data).then((response) => {
            if (response.status === 200) {
                console.log(form_data)
                console.log(response.data)
                console.log("yes baby")
            }else {
              console.log("form_data")
            }
        }).catch((error) => {
            console.log(error)
        })

//     const auth = {
//       username: data.email,
//       password: data.password,
//     };

//     var bodyFormData = new FormData();
//     bodyFormData.append('email', data.email);
//     bodyFormData.append('password', data.password);
//     bodyFormData.append('name', data.name);

//     console.log(bodyFormData)

//     const options = {
//       method: "post",
//       data: bodyFormData,
//       url,
//     };
//     axios(options)
//  .then((response) => {
//       console.log(response.data.access_token);
//   })
//  .catch((err) => {
//       console.log(err);
//   });
    // axios.post("http://127.0.0.1:8000/help", data)
    // .then(function (response) {
    //   console.log(data)
    //   console.log(response.status);
    //   if (response.status === 200) {
    //     setResStatus("Successful Registration!");
    //   } else {
    //     setResStatus("error");
    //   }
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    
    console.log(data)};

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

            <div>
              <h5 style={{ marginLeft: '1rem' }}>Password</h5>
              <input {...register("name", { required: true })} placeholder="Password" style={{ marginTop: '0.5rem' }} />
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