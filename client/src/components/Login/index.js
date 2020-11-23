import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const Login = () => {
  const { userData, handleInputChange, handleLogin, loginFailureMessage } = useContext(UserContext);

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='blue' textAlign='center'>
         Log-in to your account
      </Header>
      <Form size='large'>
        <Segment >
          <Form.Input 
            type="text"
            name ="username"
            fluid icon='user' 
            iconPosition='left' 
            placeholder='user' 
            value={userData.username}
            onChange={handleInputChange}/>
          <Form.Input
            type = "text"
            name = "password"
            fluid icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={userData.password}
            onChange={handleInputChange}
          />

          <Button onClick={handleLogin} color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      {loginFailureMessage ? <Message error>{loginFailureMessage}</Message> : <p></p>}
      <Message>
      <Link to="/signup">New to us? Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
    
  
  );
};

export default Login;
