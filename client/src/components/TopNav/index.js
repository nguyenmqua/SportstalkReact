import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import SportsTicker from "../Ticker";
import MenuNotifictions from "../MenuNotificaitons"
import {  Menu, Grid,Image, Button, Icon } from "semantic-ui-react";

const Navigation = () => {
  const { loggedIn, logout, user,sidebarToggle} = useContext(UserContext);
  
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
      <Menu borderless size="small" >
        <Menu.Menu postion="left">
          <Menu.Item>
                <Image onClick={newsfeed} src="../../images/logo.jpg" size="tiny"/>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        {loggedIn ? (
          <>
         <Grid>
           <Grid.Column only="computer">
            <Menu.Item fitted="vertically">
              <Button id="menuButton" content="Newsfeed" onClick={newsfeed} />
              <Button id="menuButton" content="My Accounts" onClick={userPage} />
              <Button id="menuButton" content="Log Out" onClick={logout} />
            </Menu.Item> 
            </Grid.Column>
            <Grid.Column only="tablet">
            <Menu.Item fitted="vertically">
              <Button id="menuButton" content="Newsfeed" onClick={newsfeed} />
              <Button id="menuButton" content="My Accounts" onClick={userPage} />
              <Button id="menuButton" content="Log Out" onClick={logout} />
            </Menu.Item> 
            </Grid.Column>
              <Grid.Column only="mobile">
                <Menu.Item >
                  <MenuNotifictions />
                  <Icon corner="top right" onClick={sidebarToggle} name="toggle down" size="big" />
                </Menu.Item>
              </Grid.Column>
            </Grid>
          </>
        ) : (
          <>
          <Menu.Item fitted>
            <Button compact id="menuButton" content="Login" onClick={login}  style={{color:"#008ae6" }}/>
            <Button compact id="menuButton" content="Signup" onClick={signup}  style={{color:"#008ae6" }}/>
          </Menu.Item>  
      </>
        )}
        </Menu.Menu>
      </Menu>
      <SportsTicker />
    </div>
  );
};
export default Navigation;
