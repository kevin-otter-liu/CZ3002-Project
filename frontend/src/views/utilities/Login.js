import React from "react";
import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { AuthenticationActions } from "../../store/Authentication";
import ax from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";

const axios = ax.create({
  baseURL: "http://172.21.148.163",
  headers: {
    "Content-Type": "application/json",
  },
});

toast.configure();

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const loginToggleHandler = (event) => {
    setIsSignUp(true);
  };

  const signUpToggleHandler = (event) => {
    setIsSignUp(false);
  };

  const signInHandler = async (emailInput, passwordInput) => {
    try {
      let response = await axios.post("/api/v1/auth/sign-in", {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        dispatch(AuthenticationActions.login());
        toast("Successfully signed in! Directing to the main page ... ", {
          autoClose: 750,
        });
        localStorage.setItem("jwt_token", response.data.token);
        navigate("/dashboard/default");
      }
    } catch (error) {
      // probably need implement a modal to alert the user of error
      let error_list = error.response.data.map((error) => {
        toast(`Error! ${error.message}`, {autoClose:1500});
      });
    }
  };

  const signUpHandler = async (emailInput, passwordInput) => {
    try {
      let response = await axios.post("/api/v1/auth/sign-up", {
        email: emailInput,
        password: passwordInput,
      });

      dispatch(AuthenticationActions.login());
      navigate("/dashboard/default");
    } catch (error) {
      let error_list = error.response.data.map((error) => {
        toast(`Error! ${error.message}`, {autoClose:1500});
      });
    }
  };

  return (
    <Fragment>
      {isSignUp ? (
        <SignUp onToggle={signUpToggleHandler} onSignUp={signUpHandler} />
      ) : (
        <Login onToggle={loginToggleHandler} onSignIn={signInHandler} />
      )}
    </Fragment>
  );
};

export default LoginPage;
