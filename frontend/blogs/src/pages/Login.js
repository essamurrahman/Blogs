import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
    useCallback
  } from 'react';
  
  import classes from '../components/Login.module.css';
  import '../components/BlogCard.css';

  
  const checkLogin = (async (email, password) => {
    
    const bods = JSON.stringify({
        email: email,
        password: password
    })
    
    // console.log(bods)

    try {
      const response = await fetch('http://localhost:4000/auth/login', 
      {
        method: 'POST',
        // body: JSON.stringify(
        //     {
        //         email: emailState.value,
        //         password: passwordState.value
        //     }
        // )
        body: bods
      }
      );
      const data = await response.json();
    //   console.log(data)
    localStorage.setItem("User", data.userId)
    localStorage.setItem("Token", data.token)      
    }
        catch (error)
        {
      
    }
  });



  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
  };
  
  const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
  };
  
  const Login = (props) => {  
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: '',
      isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      value: '',
      isValid: null,
    });
  
    // const authCtx = useContext(AuthContext);
  
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
  
  
    const emailChangeHandler = (event) => {
      dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };
  
    const passwordChangeHandler = (event) => {
      dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };
  
    const validateEmailHandler = () => {
      dispatchEmail({ type: 'INPUT_BLUR' });
    };
  
    const validatePasswordHandler = () => {
      dispatchPassword({ type: 'INPUT_BLUR' });
    };
  
    const submitHandler = (event) => {
      event.preventDefault();
        
      checkLogin(emailState.value, passwordState.value);
    
    };
  
    return (
      <>
        <form onSubmit={submitHandler}>
        <section>
          <input
            ref={emailInputRef}
            id="email"
            label="E-Mail"
            type="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          </section>
          <section>
          <input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          </section>
          <section>
          <div className={classes.actions}>
            <button type="submit" onClick={submitHandler} className="btnCards">
              Login
            </button>
          </div>
          </section>
        </form>
      </>
    );
  };
  
  export default Login;
  