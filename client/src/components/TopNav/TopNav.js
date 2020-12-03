import React, { useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import SportsTicker from "../Ticker";
import MenuNotifictions from "../../components/MenuNotificaitons"
import {  Menu, Grid,Image } from "semantic-ui-react";
import Odds from "../../components/Odds"

const Navigation = () => {
  const { loggedIn, logout, user, notifications } = useContext(UserContext);
  
  const userPage = () => {
    window.location.href = "/member/" + user._id;
  };
  const login = () => {
    window.location.href = "/login" ;
  };
  const signup = () => {
    window.location.href = "/signup" ;
  };
  const newsfeed = () => {
    window.location.href = "/newsfeed";
  };

  return (
    <div>
      <SportsTicker />
      <Menu style={{ whiteSpace: "nowrap", borderColor:"#008ae6", borderStyle:"inset" }} size="large" >
        <Menu.Menu postion="left">
          <Menu.Item>
                <Image src="../../images/logo.jpg" size="tiny"/>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu style={{ marginRight:"20px"  }}position="right">
        {loggedIn ? (
          <>
            <Menu.Item color="blue" name="newfeed" onClick={newsfeed}/>
            <Menu.Item name="accounts" onClick={userPage} />
            <Menu.Item  name="logout" onClick={logout} />
            <Grid>
              <Grid.Column only="mobile">
                <Menu.Item >
                  <MenuNotifictions />
                </Menu.Item>
              </Grid.Column>
            </Grid>
          </>
        ) : (
          <>
          <Menu.Item  name="Login" onClick={login}  style={{color:"#008ae6" }}/>
          <Menu.Item name="signup" onClick={signup}  style={{color:"#008ae6" }}/>

      </>
        )}
        </Menu.Menu>
      </Menu>
   
    </div>
  );
};
export default Navigation;
