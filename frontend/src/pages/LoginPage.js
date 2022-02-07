import MainHeader from '../components/MainHeader';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { AuthenticationActions } from '../store/Authentication';
import ax from 'axios';
import { useHistory } from 'react-router-dom';

const axios = ax.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useHistory();

  const loginToggleHandler = (event) => {
    setIsSignUp(true);
  };

  const signUpToggleHandler = (event) => {
    setIsSignUp(false);
  };

  const signInHandler = async (emailInput, passwordInput) => {
    try {
      let response = await axios.post('/api/v1/sign-in', {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        dispatch(AuthenticationActions.login());
        history.push('/main');
      }
    } catch (error) {
      // probably need implement a modal to alert the user of error
      let error_list = error.response.data.map((error) => {
        return error.message;
      });
      history.push('/errorPage');
    }
  };

  const signUpHandler = async (emailInput, passwordInput) => {
    try {
      let response = await axios.post('/api/v1/sign-up', {
        email: emailInput,
        password: passwordInput,
      });

      dispatch(AuthenticationActions.login());
      history.push('./main');
    } catch (error) {
      let error_list = error.response.data.map((error) => {
        return error.message;
      });
      history.push('/errorPage');
    }
  };

  return (
    <Fragment>
      <MainHeader />
      {isSignUp ? (
        <SignUp onToggle={signUpToggleHandler} onSignUp={signUpHandler} />
      ) : (
        <Login onToggle={loginToggleHandler} onSignIn={signInHandler} />
      )}
    </Fragment>
  );
};

export default LoginPage;
