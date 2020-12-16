import React, { useContext} from "react"
import UserContext from '../../utils/UserContext'
import { Feed, Image, Button, Popup, Icon, Segment } from "semantic-ui-react";
import moment from "moment"
import { Link } from 'react-router-dom';


const Notifications = () => {
    const {notifications, deleteNotifications} = useContext(UserContext)
    
    return(
        <>
        {notifications.length > 0 ? (
        <Feed>
        {notifications && notifications.map(notification =>(
          <Feed.Event key = {notification._id}>
                    <Feed.Content>
                    <Popup content='Close' trigger={ <Icon color="red" onClick={()=>deleteNotifications(notification._id)}fitted name='close' />} />
                         {notification.type ==="init wager"? (
                             <>
                             <Feed.Label>
                            <Image
                            floated='right'
                            size="mini"
                            circular
                            src={notification.sportTicket.userId.profilePic}
                            />
                        </Feed.Label>
                            <Feed.Summary>
                            {notification.sportTicket.userId.username} wants to make a wager of $<strong>{notification.sportTicket.wager}</strong>!
                                <Feed.Date>{moment(notification.createdAt).fromNow()} </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                                
                                    <Popup content='View the wager' trigger={ <Link to={'/wager/'+ notification.sportTicket._id}><Button compact color='green'><Icon fitted name='eye' /></Button></Link>} />
                                    <Popup content='Decline Wager' trigger={ <Button compact color='red'onClick={()=>deleteNotifications(notification._id)}><Icon fitted name='close' /></Button>} />
                
                            </Feed.Extra>
                            </>
                        ):(
                            <></>  
                        )}
                        {notification.type==="response wager" ? (  
                            <>
                            <Feed.Label>
                            <Image
                            floated='right'
                            size="mini"
                            circular
                            src={notification.sportTicket.competitor.profilePic}
                            />
                        </Feed.Label>
                            <Feed.Summary>
                                {notification.sportTicket.competitor.username} has confirm the wager of $<strong>{notification.sportTicket.wager}</strong>!
                                <Feed.Date>{moment(notification.createdAt).fromNow()} </Feed.Date>
                            </Feed.Summary>
                            </>
                        ):(
                            <></>
                        )}
                        {notification.type==="update winner" ? (
                            <>
                            <Feed.Label>
                            <Image
                            floated='right'
                            size="mini"
                            circular
                            src={notification.sportTicket.updater.profilePic}
                            />
                        </Feed.Label>
                            <Feed.Summary>
                            {notification.sportTicket.updater.username} has indicated that <strong>{notification.sportTicket.winner.username}</strong> has won the bet for ticket {notification.sportTicket._id}!
                            <Feed.Date>{moment(notification.createdAt).fromNow()} </Feed.Date>
                            
                                    <Popup content='View/Edit the Results' trigger={ <Link to={'/wager/'+ notification.sportTicket._id}><Button  color='green'><Icon fitted name='eye' /></Button></Link>} />
                                    <Popup content='Close' trigger={ <Button color='red'onClick={()=>deleteNotifications(notification._id)}><Icon fitted name='close' /></Button>} />
                            
                        </Feed.Summary>
                        </>
                        ): (<></>)}
                        {notification.type==="accept winner" ? (
                            <Feed.Summary>
                            Ticket #{notification.sportTicket._id} has been approved!<strong> {notification.sportTicket.winner.username}</strong> has won the bet for ticket {notification.sportTicket._id}!
                            <Feed.Date>{moment(notification.createdAt).fromNow()} </Feed.Date>
                        </Feed.Summary>
                        ): (<></>)}
                        {notification.type==="decline winner" ? (
                            <Feed.Summary>
                            Ticket #{notification.sportTicket._id} has been decline for the winner.
                            <Feed.Date>{moment(notification.createdAt).fromNow()} </Feed.Date>
                                    <Popup content='Close' trigger={ <Button color='red'onClick={()=>deleteNotifications(notification._id)}><Icon fitted name='close' /></Button>} />
                        </Feed.Summary>
                        ): (<></>)}
                    </Feed.Content>
                </Feed.Event>
                ))}
        </Feed>
        ):(<></>)}
    </>
    )
}

export default Notifications