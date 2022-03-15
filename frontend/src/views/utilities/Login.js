import React from 'react'

import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { AuthenticationActions } from '../../store/Authentication';
import ax from 'axios';
import { useNavigate } from 'react-router-dom';

const axios = ax.create({
    baseURL: 'http://172.21.148.163',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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
      let response = await axios.post('/api/v1/auth/sign-in', {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        dispatch(AuthenticationActions.login());
        localStorage.setItem("jwt_token", response.data.token);
        navigate('/dashboard/default');
      }
    } catch (error) {
      // probably need implement a modal to alert the user of error
      let error_list = error.response.data.map((error) => {
        return error.message;
      });
    }
  };

  const signUpHandler = async (emailInput, passwordInput) => {
    try {
      let response = await axios.post('/api/v1/auth/sign-up', {
        email: emailInput,
        password: passwordInput,
      });

      dispatch(AuthenticationActions.login());
      navigate('/dashboard/default');
    } catch (error) {
      let error_list = error.response.data.map((error) => {
        return error.message;
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