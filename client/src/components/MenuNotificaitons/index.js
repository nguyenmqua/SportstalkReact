import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { Feed, Image, Button, Popup, Icon, Segment } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notifications, deleteNotifications } = useContext(UserContext);

  return (
    <>
      
          {notifications.length > 0 ? (
          <Popup position="bottom right" trigger={<Icon color="red" name="alarm" size="large" />}>
        <Popup.Header>Notifications</Popup.Header>
        <Popup.Content>
            <Feed>
              <Segment style={{ height: "100vh", margin: "5px" }}>
                {notifications &&
                  notifications.map((notification) => (
                    <Feed.Event
                      style={{ height: "100vh", margin: "5px" }}
                      key={notification._id}
                    >
                      <Feed.Content>
                        <Popup
                          content="Close"
                          trigger={
                            <Icon
                              color="red"
                              onClick={() =>
                                deleteNotifications(notification._id)
                              }
                              fitted
                              name="close"
                            />
                          }
                        />
                        <Feed.Label>
                          <Image
                            floated="right"
                            size="mini"
                            circular
                            src={notification.sportTicket.userId.profilePic}
                          />
                        </Feed.Label>
                        {notification.type === "init wager" ? (
                          <>
                            <Feed.Summary>
                              {notification.sportTicket.userId.username} wants
                              to make a wager of $
                              <strong>{notification.sportTicket.wager}</strong>!
                              <Feed.Date>
                                {moment(notification.createdAt).fromNow()}{" "}
                              </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                              <Popup
                                content="View the wager"
                                trigger={
                                  <Link
                                    to={
                                      "/wager/" + notification.sportTicket._id
                                    }
                                  >
                                    <Button compact color="green">
                                      <Icon fitted name="eye" />
                                    </Button>
                                  </Link>
                                }
                              />
                              <Popup
                                content="Decline Wager"
                                trigger={
                                  <Button
                                    compact
                                    color="red"
                                    onClick={() =>
                                      deleteNotifications(notification._id)
                                    }
                                  >
                                    <Icon fitted name="close" />
                                  </Button>
                                }
                              />
                            </Feed.Extra>
                          </>
                        ) : (
                          <></>
                        )}
                        {notification.type === "response wager" ? (
                          <Feed.Summary>
                            {notification.sportTicket.competitor.username} has
                            confirm the wager of $
                            <strong>{notification.sportTicket.wager}</strong>!
                            <Feed.Date>
                              {moment(
                                notification.sportTicket.createdAt
                              ).fromNow()}{" "}
                            </Feed.Date>
                          </Feed.Summary>
                        ) : (
                          <></>
                        )}
                        {notification.type === "update winner" ? (
                          <Feed.Summary>
                            {notification.sportTicket.updater.username} has
                            indicated that{" "}
                            <strong>
                              {notification.sportTicket.winner.username}
                            </strong>{" "}
                            has won the bet for ticket{" "}
                            {notification.sportTicket._id}!
                            <Feed.Date>
                              {moment(
                                notification.sportTicket.createdAt
                              ).fromNow()}{" "}
                            </Feed.Date>
                            <Popup
                              content="View/Edit the Results"
                              trigger={
                                <Link
                                  to={"/wager/" + notification.sportTicket._id}
                                >
                                  <Button color="green">
                                    <Icon fitted name="eye" />
                                  </Button>
                                </Link>
                              }
                            />
                            <Popup
                              content="Close"
                              trigger={
                                <Button
                                  color="red"
                                  onClick={() =>
                                    deleteNotifications(notification._id)
                                  }
                                >
                                  <Icon fitted name="close" />
                                </Button>
                              }
                            />
                          </Feed.Summary>
                        ) : (
                          <></>
                        )}
                      </Feed.Content>
                    </Feed.Event>
                  ))}
              </Segment>
            </Feed>
            </Popup.Content>
      </Popup>
          ) : (
            <Popup position="bottom right" header="no new notifications" trigger={<Icon color="black" name="alarm" size="large" />}/>
          )}
        
    </>
  );
};

export default Notifications;
