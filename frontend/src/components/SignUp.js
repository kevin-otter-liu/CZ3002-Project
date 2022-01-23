import { useRef } from 'react';
import classes from './SignUp.module.css';

const SignUp = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const loginHandler = () => {};

  const toggleHandler = (event) => {
    props.onToggle(event);
  };

  return (
    <div>
      <form className={classes.signUp} onSubmit={loginHandler}>
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
          <button type='submit'>Create Account</button>
          <button onClick={toggleHandler} className={classes.toggle}>
            Login here
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
