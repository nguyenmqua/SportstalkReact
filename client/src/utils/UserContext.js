import React from 'react';


const UserContext = React.createContext({
  userData: {},
  loggedIn: false,
  user: {},
  failureMessage: "",
  post: {},
  notifications:{},
  AllPost:{},
  Post: "",
  loading: false,
  handleInputChange: () => {},
  handleLogin: () => {},
  handleSignup: () => {},
  logout: () => {},
  deleteNotifications: () => {},
  loadPost: () => {},
  setPost: ()=>{},
  deletePost: ()=>{},
  sidebarToggle: () =>{},
  footballColor:() =>{},
  setLoading: () => {}
});

export default UserContext;
