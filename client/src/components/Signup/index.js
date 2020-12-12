import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Message, Input, Grid,Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import UserContext from '../../utils/UserContext';

const Signup = () => {
  const {
    userData,
    handleInputChange,
    handleSignup,
    failureMessage,
  } = useContext(UserContext);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    console.log(errorMessage);
  }, []);

  const handleConfirmPassword = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  // make sure firstname is at least 3 characters
  const checkFirstname = () => {
    const length = userData.firstname.length;
    if (length === 0) {
      setValidFirstName(false);
      setErrorMessage({ ...errorMessage, firstname: null });
    } else if (length < 3) {
      setValidFirstName(false);
      setErrorMessage({
        ...errorMessage,
        firstname: 'First Name should be at least 3 characters.',
      });
    } else {
      setValidFirstName(true);
      setErrorMessage({ ...errorMessage, firstname: null });
    }
  };
  // make sure firstname is at least 3 characters
  const checkLastname = () => {
    const length = userData.lastname.length;
    if (length === 0) {
      setValidLastName(false);
      setErrorMessage({ ...errorMessage, lastname: null });

    } else if (length < 3) {
      setValidLastName(false);
      setErrorMessage({
        ...errorMessage,
        lastname: 'Last Name should be at least 3 characters.',
      });
    } else {
      setValidLastName(true);
      setErrorMessage({ ...errorMessage, lastname: null });
    }
  };

  // uses regex to check is email is valid
  const checkEmail = () => {
    const validEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    const valid = validEmail.test(userData.email);
    const length = userData.email.length;
    if (length === 0) {
      setValidEmail(false);
      setErrorMessage({ ...errorMessage, email: null });
    } else if (!valid) {
      setValidEmail(false);
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter a valid email address.',
      });
    } else {
      setValidEmail(true);
      setErrorMessage({ ...errorMessage, email: null });
    }
  };

  // make sure username is at least 5 characters
  const checkUsername = () => {
    const length = userData.username.length;
    if (length === 0) {
      setValidUserName(false);
      setErrorMessage({ ...errorMessage, username: null });
    } else if (length < 5) {
      setValidUserName(false);
      setErrorMessage({
        ...errorMessage,
        username: 'Username should be at least 5 characters.',
      });
    } else {
      setValidUserName(true);
      setErrorMessage({ ...errorMessage, username: null });
    }
  };

  // checks is password meets regex test (at least 8 letters, 1 capital and 1 number)
  const checkPassword = () => {
    const strongPassword = new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    );
    const valid = strongPassword.test(userData.password);
    const length = userData.password.length;
    if (length === 0) {
      setValidPassword(false);
      setErrorMessage({ ...errorMessage, password: null });
    } else if (!valid) {
      setValidPassword(false);
      setErrorMessage({
        ...errorMessage,
        password: 'Password should be at least 8 letters, 1 capital & 1 number',
      });
    } else {
      setValidPassword(true);
      setErrorMessage({ ...errorMessage, password: null });
    }
  };

  // checks if 2 password fields match
  const checkConfirmPassword = () => {
    if (confirmPassword.length === 0) {
      setIsConfirmed(false);
      setErrorMessage({ ...errorMessage, confirmPassword: null });
    } else if (
      userData.password !== null &&
      userData.password === confirmPassword
    ) {
      setIsConfirmed(true);
      setErrorMessage({ ...errorMessage, confirmPassword: null });
    } else {
      setIsConfirmed(false);
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Passwords must match',
      });
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh', margin:"10px"  }} verticalAlign='top'>
    <Grid.Column style={{ maxWidth: 450, paddingRight:"10px"  }}>
      <Header as='h2' color='blue' textAlign='center'>
         Welcome, signup.
      </Header>
      <Form>
        <Segment>
          <Header as="h5" color="red">{failureMessage}</Header>
            <Form.Field
            control={Input}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={userData.firstname}
            onChange={handleInputChange}
            onBlur={checkFirstname}
            valid={validFirstName.toString()}
            error={errorMessage['firstname']}
          />
          <Form.Field
            control={Input}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name "
            value={userData.lastname}
            onChange={handleInputChange}
            onBlur={checkLastname}
            valid={validLastName.toString()}
            error={errorMessage['lastname']}            
          />
          <Form.Field
            control={Input}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={checkUsername}
            valid={validUserName.toString()}
            error={errorMessage['username']}            
          />
          <Form.Field
            control={Input}
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
            value={userData.email}
            onChange={handleInputChange}
            onBlur={checkEmail}
            valid={validEmail.toString()}
            error={errorMessage['email']}    
          />
          <Form.Field
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
            onBlur={checkPassword}
            valid={validPassword.toString()}
            control={Input}            
            error={errorMessage['password']}
          />
          <Form.Field
             type="password"
             name="password"
             control={Input}
             id="confirmPassword"
             placeholder="confirm password"
             value={confirmPassword}
             onChange={handleConfirmPassword}
             onKeyUp={checkConfirmPassword}
             valid={isConfirmed.toString()} 
             error={errorMessage['confirmPassword']}
          />
        {validFirstName &&
        validLastName &&
        validEmail &&
        validUserName &&
        validPassword &&
        isConfirmed
         ? (
          <Button onClick={handleSignup} color="green" compact >
            Signup
          </Button>
        ) : (
          <Button  color="red" compact disabled>
            Signup
          </Button>
        )}
        <p className="signupLink">
          <Link to="/login">already have an account? Sign in here</Link>
        </p>
        </Segment>
      </Form>
      </Grid.Column>
  </Grid>
  );
};

export default Signup;
