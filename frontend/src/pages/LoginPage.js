import MainHeader from '../components/MainHeader';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useState, Fragment } from 'react';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const loginToggleHandler = (event) => {
    setIsSignUp(true);
  };

  const signUpToggleHandler = (event) => {
    setIsSignUp(false);
  };

  return (
    <Fragment>
      <MainHeader />
      {isSignUp ? (
        <SignUp onToggle={signUpToggleHandler} />
      ) : (
        <Login onToggle={loginToggleHandler} />
      )}
    </Fragment>
  );
};

export default LoginPage;
