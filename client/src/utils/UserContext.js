import React from 'react';


const UserContext = React.createContext({
  userData: {},
  loggedIn: false,
  user: {},
  failureMessage: "",
  post: {},
  notifications:{},
  AllPost:{},
  handleInputChange: () => {},
  handleLogin: () => {},
  handleSignup: () => {},
  logout: () => {},
  deleteNotifications: () => {},
  loadPost: () => {},
  setPost: ()=>{},
  deletePost: ()=>{}
});

export default UserContext;
