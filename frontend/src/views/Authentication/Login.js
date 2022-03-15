import { useRef } from 'react';
import classes from './Login.module.css';

const Login = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const loginHandler = async (event) => {
    event.preventDefault();

    await props.onSignIn(emailInput.current.value, passwordInput.current.value);
  };
  const toggleHandler = (event) => {
    props.onToggle(event);
  };

  return (
    <div>
      <form className={classes.login} onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' ref={emailInput} id='email' required></input>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            ref={passwordInput}
            id='password'
            required></input>
        </div>
        <div className={classes.actions}>
          <button type='submit'>Login</button>
          <button className={classes.toggle} onClick={toggleHandler}>
            Sign Up Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;