import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Edit from "./components/Edit"
import API from './utils/API';
import Newsfeed from './pages/Newsfeed';
import Auth from './pages/Auth';
import NoMatch from './pages/NoMatch';
import Wager from "./pages/Wager"
import TopNav from './components/TopNav';
import UserContext from './utils/UserContext';
import Comment from "./components/Comments"
import Bet from "./components/Bet"
import Notifications from "./components/Notifications"
import Member from "./pages/Member"
import UserPost from "./components/UserPost"
import UpdateResult from './components/UpdateResults'

const App = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [failureMessage, setFailureMessage] = useState();
  const [loginFailureMessage, setLoginFailureMessage] = useState("")
  const [notifications, setNotifications] = useState([])
  const [AllPost, setAllPost] = useState([])
  const [Post, setPost] = useState("")


  useEffect(() => {
    isLoggedIn();
  }, []);

  const deleteNotifications = (id) =>{
    API.deleteNotifications(id)
      .then( 
        API.getNotifications(user._id)
        .then(res=>{
          console.log(res.data)
          setNotifications(res.data)
        })
      )
      .catch(err=> console.log(err))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: userData.username,
      password: userData.password,
    };
    if (userData.username && userData.password) {
      API.login(data)
        .then((user) => {
          if (user.data.loggedIn) {
            setLoggedin(true);
            setUser(user.data.user);
            console.log('log in successful');
            window.location.href = '/';
          } else {
            console.log('Something went wrong :(');
            setLoginFailureMessage('Login failed, Please try again.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    try {
      const data = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
      };

      if (userData.username && userData.password) {
        API.signup(data)
          .then((user) => {
            if (user.data === 'email is already in use') {
              setFailureMessage('Email already in use.');
            }
            if (user.data === 'user already exists') {
              setFailureMessage('User already exists. Choose another username.');
            }
            if (user.data.loggedIn) {
              if (user.data.loggedIn) {
                setLoggedin(true);
                setUser(user.data.user);
                window.location.href = '/';
              } else {
                console.log('something went wrong :(');
                console.log(user.data);
                setFailureMessage(user.data);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log('App -> error', error);
    }
  };

  const loadPost =() => {
    API.newsfeed()
    .then(res => {
        setAllPost(res.data)
    })
    .catch(err => console.log(err))
}

  const isLoggedIn = () => {
    if (!loggedIn) {
      API.isLoggedIn().then((user) => {
        if (user.data.loggedIn) {
          setLoggedin(true);
          setUser(user.data.user);
      API.getNotifications(user.data.user._id)
          .then(res=>{
            console.log(res.data)
            setNotifications(res.data)
          })
        } else {
          console.log(user.data.message);
        }
      });
    }
  };

  const logout = () => {
    if (loggedIn) {
      API.logout().then(() => {
        console.log('logged out successfully');
        setLoggedin(false);
        setUser(null);
      });
    }
  }; 

  const handleUserBtnClick = async (e) => {
    try {
      const res = await API.postPost({
        post: Post,
        userId: user

      })
      setPost("")
      loadPost()
    } catch (error) {
      console.log(
        "There was an error processing your results, please try again",
        error
      );
    }
  }

  function deletePost(id) {
    API.deletePost(id)
      .then(res => loadPost())
      .catch(err => console.log(err));
  }

  const contextValue = {
    userData,
    loggedIn,
    user,
    failureMessage,
    loginFailureMessage,
    notifications,
    AllPost,
    handleInputChange,
    handleLogin,
    handleSignup,
    logout,
    setUser,
    deleteNotifications,
    loadPost,
    setPost,
    handleUserBtnClick,
    deletePost
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <div>
          <TopNav />
            <Switch>
              <Route exact path="/" component={Newsfeed} />
              <Route
                exact
                path="/login"
                render={() => <Auth action="login" />}
              />
              <Route
                exact
                path="/signup"
                render={() => <Auth action="signup" />}
              />
              <Route exact path="/newsfeed" component={Newsfeed} />
              <Route exact path="/member/:id" component={Member} />
              <Route exact path="/wager/:id" component={Wager} />
              <Route render={NoMatch} />
              <Comment />
              <Edit />
              <Bet />
              <Notifications />
              <UserPost />
              <UpdateResult />
            </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
