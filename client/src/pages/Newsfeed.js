import React, { useEffect, useContext } from "react";
import UserContext from '../utils/UserContext';
import Login from "../components/Login"
import { Card, Icon, Image,Grid, Popup, Segment, Header, Dimmer, Loader } from 'semantic-ui-react'
import moment from 'moment'
import Post from "../components/Post"
import Comments from "../components/Comments"
import Odds from "../components/Odds";
import Edit from "../components/Edit";
import Bet from "../components/Bet";
import Notifications from "../components/Notifications";
const style = {
    h1: {
      padding: '5px'
    },
    button: {
     padding: "10px"
    }
  }

function Newsfeed(){   
    const { loggedIn, user, loadPost, AllPost, deletePost,loading} = useContext(UserContext);
   
    useEffect(() => {
      loadPost()
    }, []) 

    return(
        <>
        {loggedIn ? (
            
            <Grid stackable columns="equal">
               {loading ? (
                <Dimmer active>
                   <Loader content='Loading' />
                 </Dimmer>
               ):(
                <>
            <Grid.Column>
                 <Grid.Row>
                    <Segment basic >
                        <Card>
                            <Odds />
                            <Edit />
                            <Bet />
                        </Card>
                    </Segment>
                </Grid.Row>
                </Grid.Column>
                    
                <Grid.Column width ={8}>
                    <Segment style={{ margin:"10px", borderColor:"#008ae6" }} >
                        <Grid stackable centered>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Post />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row >
                                <Grid.Column width={12}>
                                    <Card.Group  >
                                        {AllPost && AllPost.map(post => (
                                            <Card fluid color="blue" key={post._id} style={style.h1}>
                                                <Card.Content>
                                                    <Popup
                                                        content = {"Member Since "+  moment(post.userId.createdAt).format('MMMM  YYYY')}
                                                        header={post.userId.username}
                                                        trigger={ <Image floated="left"  size='tiny' circular src={post.userId.profilePic}/>}
                                                    />
                                                    <Card.Header as='a'> 
                                                        <h4>{post.userId.username}</h4>   
                                                    </Card.Header> 
                                                    <Card.Meta>
                                                        {moment(post.createdAt).fromNow()} 
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        {user && user._id === post.userId._id ? (
                                                            <Icon className="float-right" fitted name='close' onClick={()=>deletePost(post._id)} />
                                                        ) : (
                                                            <p></p>
                                                        )} 
                                                        <h2>{post.post}</h2>
                                                    </Card.Description>
                                                </Card.Content>
                                                <Comments post={post._id} style={style.h1}/>                            
                                            </Card>
                                        ))}
                                    </Card.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
               
                <Grid.Column only="computer">
                    
                        <Card style={{ borderColor:"blue", margin:"10px"  }} >
                        <Header as='h6' icon>
                            <Icon color="blue" name='bell' />
                            Notifications
                        </Header>
                            <Notifications />
                        </Card>
                   
                </Grid.Column>
                </>
                )}   
            </Grid>
      ) : (          
        <Login />       
        )}   
    </>
    )
}

export default Newsfeed;