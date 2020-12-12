import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { Feed, Image, Button, Popup, Icon, Segment } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import NotificationsBar from "../Notifications"
const Notifications = () => {
  const { notifications, deleteNotifications } = useContext(UserContext);

  return (
    <>
      
          {notifications.length > 0 ? (
          <Popup position="bottom right" trigger={<Icon color="red" name="alarm" size="large" />}>
        <Popup.Header>Notifications</Popup.Header>
        <Popup.Content>
              <NotificationsBar />
          </Popup.Content>
      </Popup>
          ) : (
            <Popup position="bottom right" header="no new notifications" trigger={<Icon color="black" name="alarm" size="large" />}/>
          )}
        
    </>
  );
};

export default Notifications;
