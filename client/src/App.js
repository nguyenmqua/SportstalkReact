import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Edit from "./components/Edit";
import API from "./utils/API";
import Newsfeed from "./pages/Newsfeed";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import Wager from "./pages/Wager";
import TopNav from "./components/TopNav";
import UserContext from "./utils/UserContext";
import Comment from "./components/Comments";
import Bet from "./components/Bet";
import Notifications from "./components/Notifications";
import Member from "./pages/Member";
import UserPost from "./components/UserPost";
import UpdateResult from "./components/UpdateResults";
import Result from "./components/Result"
import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

const App = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const [loggedIn, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [failureMessage, setFailureMessage] = useState();
  const [loginFailureMessage, setLoginFailureMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [AllPost, setAllPost] = useState([]);
  const [Post, setPost] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    isLoggedIn();
  }, []);

  const deleteNotifications = (id) => {
    API.deleteNotifications(id)
      .then(
        API.getNotifications(user._id).then((res) => {
          console.log(res.data);
          setNotifications(res.data);
        })
      )
      .catch((err) => console.log(err));
  };

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
    setLoading(true)
    if (userData.username && userData.password) {
      API.login(data)
        .then((user) => {
          if (user.data.loggedIn) {
             window.location.href = "/"
             setLoading(false)
             setLoggedin(true);
            setUser(user.data.user);
            console.log("log in successful");
           
          } else {
            console.log("Something went wrong :(");
            setLoginFailureMessage("Login failed, Please try again.");
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
            if (user.data === "email is already in use") {
              setFailureMessage("Email already in use.");
            }
            if (user.data === "user already exists") {
              setFailureMessage(
                "User already exists. Choose another username."
              );
            }
            if (user.data.loggedIn) {
              if (user.data.loggedIn) {
                setLoggedin(true);
                setUser(user.data.user);
                window.location.href = "/";
              } else {
                console.log("something went wrong :(");
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
      console.log("App -> error", error);
    }
  };

  const loadPost = () => {
    setLoading(true)
    API.newsfeed()
      .then((res) => {
        setAllPost(res.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  const isLoggedIn = () => {
    if (!loggedIn) {
      API.isLoggedIn().then((user) => {
        if (user.data.loggedIn) {
          setLoggedin(true);
          setUser(user.data.user);
          API.getNotifications(user.data.user._id).then((res) => {
            console.log(res.data);
            setNotifications(res.data);
          });
        } else {
          console.log(user.data.message);
        }
      });
    }
  };

  
  const footballColor = (team) =>{
    switch(team) {
      case "Arizona Cardinals":
        return {primary: "#97233F", secondary: "#000000"}
      case "Atlanta Falcons":
        return {primary: "#A71930", secondary: "#000000"}
      case "Baltimore Ravens":
        return {primary:"#241773", secondary:"#000000"}
      case "Buffalo Bills":
        return {primary:"#00338D", secondary:"#C60C30"}
      case "Carolina Panthers":
        return {primary:"#0085CA", secondary:"#000000"}
      case "Chicago Bears":
        return {primary:"#C83803", secondary:"#0B162A"}
      case "Cincinnati Bengals":
        return {primary:"#FB4F14", secondary:"#000000"} 
      case "Cleveland Browns":
        return {primary:"#311D00", secondary:"#FF3C00"}
      case "Dallas Cowboys":
        return {primary:"#003594", secondary:"#869397"}
      case "Denver Broncos":
        return {primary:"#FB4F14", secondary:"#002244"}
      case "Detriot Lions":
          return {primary:"#0076B6", secondary:"#B0B7BC"}
      case "Green Bay Packers":
          return {primary:"#FFB612", secondary:"#203731"}
      case "Houston Texans":
          return {primary:"#03202F", secondary:"#A71930"}
      case "Indianapolis Colts":
          return {primary:"#002C5F", secondary:"#A2AAAD"}
      case "Jacksonville Jaguars":
          return {primary:"#101820", secondary:"#D7A22A"}
      case "Kansas City Chiefs":
          return {primary:"#E31837", secondary:"#FFB81C"}
      case "Los Angeles Chargers":
          return {primary:"#D7A22A", secondary:"#000000"}
      case "Los Angeles Rams":
          return {primary:"#003594", secondary:"#FFA300"}
      case "Miami Dolphins":
          return {primary:"#008E97", secondary:"#FC4C02"}
      case "Minnesota Vikings":
          return {primary:"#4F2683", secondary:"#FFC62F"}
      case "New England Patriots":
          return {primary:"#002244", secondary:"#C60C30"}
      case "New Orleans Saints":
          return {primary:"#D3BC8D", secondary:"#101820"}
      case "New York Giants":
          return {primary:"#0B2265", secondary:"#A71930"}
      case "New York Jets":
          return {primary:"#125740", secondary:"#000000"}
      case "Las Vegas Raiders":
          return {primary:"#000000", secondary:"#A5ACAF"}
      case "Philadelphia Eagles":
          return {primary:"#004C54", secondary:"#A5ACAF"}
      case "Pittsburgh Steelers":
          return {primary:"#FFB612", secondary:"#0000000"}
      case "San Francisco 49ers":
          return {primary:"#AA0000", secondary:"#B3995D"}
      case "Seattle Seahawks":
          return {primary:"#69BE28", secondary:"#002244"}
      case "Tampa Bay Buccaneers":
          return {primary:"#D50A0A", secondary:"#FF7900"}
      case "Tennessee Titans":
          return {primary:"#0C2340", secondary:"#4B92DB"}
      case "Washington Redskins":
          return {primary:"#773141;", secondary:"#FFB612"}
        break;
      default:
        return {primary: "blue"}
    }
  }

  const logout = () => {
    if (loggedIn) {
      API.logout().then(() => {
        console.log("logged out successfully");
        setLoggedin(false);
        setUser(null);
      });
    }
  };

  const memberPage = () =>{
    window.location.href="/member/"+user._id
  }
  const handleUserBtnClick = async (e) => {
    try {
      const res = await API.postPost({
        post: Post,
        userId: user,
      });
      loadPost();
      setPost("");
      
    } catch (error) {
      console.log(
        "There was an error processing your results, please try again",
        error
      );
    }
  };

  function deletePost(id) {
    API.deletePost(id)
      .then((res) => loadPost())
      .catch((err) => console.log(err));
  }

  const sidebarToggle = () =>{
    setVisible(!visible)
  }

  const contextValue = {
    userData,
    loggedIn,
    user,
    failureMessage,
    loginFailureMessage,
    notifications,
    AllPost,
    Post,
    handleInputChange,
    handleLogin,
    handleSignup,
    logout,
    setUser,
    deleteNotifications,
    loadPost,
    setPost,
    handleUserBtnClick,
    deletePost,
    sidebarToggle,
    footballColor,
    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <div>
          <TopNav />
            <Grid.Column>
              <Sidebar.Pushable as={Segment}>
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  icon="labeled"
                  inverted
                  onHide={() => setVisible(false)}
                  vertical
                  visible={visible}
                  width="thin"
                >
                  <Menu.Item as="a" href="/">
                    <Icon  name="home" />
                    SportsFeed
                  </Menu.Item>
                  <Menu.Item  onClick={memberPage}>
                    <Icon name="user" />
                    My Account
                  </Menu.Item>
                  <Menu.Item as="a" onClick={logout}>
                    <Icon name="log out" />
                    Log Out
                  </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={visible}>
                  <Segment basic>
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
                    <Result />
                    </Switch>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
