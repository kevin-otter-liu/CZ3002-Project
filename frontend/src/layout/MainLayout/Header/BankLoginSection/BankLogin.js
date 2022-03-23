import React from "react";
import { useRef } from "react";
import classes from "./BankLogin.module.css";

import dbslogo from "../../../../assets/images/dbslogo.png";

const BankLogin = (props) => {

  const usernameInput = useRef();
  const passwordInput = useRef();

  return (
    <>
      <form className={classes.login} onSubmit={props.submitHandler}>
        <img className={classes.logo} src={dbslogo} alt="Logo"/>    
        <div className={classes.control}>   
          <label>Username</label>
          <input ref={usernameInput} id="username" required></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={passwordInput}
            id="password"
            required
          ></input>
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default BankLogin;
