import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
  } from 'react';
  
  import classes from '../components/Login.module.css';
  import '../components/BlogCard.css';


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
  
  const Signup = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
  
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
      if (formIsValid) {
        authCtx.onLogin(emailState.value, passwordState.value);
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
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
            <button type="submit" className="btnCards">
              Sign Up
            </button>
          </div>
          </section>
        </form>
      </>
    );
  };
  
  export default Signup;
  