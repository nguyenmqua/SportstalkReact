import React, { useEffect, useState, useContext } from "react";
import API from "../utils/API"
import UserContext from '../utils/UserContext';
import Login from "../components/Login"
import { Card, Button,Icon, Image,Grid } from 'semantic-ui-react'
import moment from 'moment'
import Post from "../pages/Post"
import Comments from "../components/Comments"
import SportTicket from "../components/SportsTicket";
import Edit from "../components/Edit"
const style = {
    h1: {
      padding: '5px'
    },
    button: {
     padding: "10px"
    }
  }

function Newsfeed(props){
    
    const { loggedIn, user} = useContext(UserContext);
    const [AllPost, setAllPost] = useState([])
    
    useEffect(() => {
      loadPost()
    }, [])

    function loadPost(){
        API.newsfeed()
        .then(res => {
            setAllPost(res.data)
            console.log(res.data)})
        .catch(err => console.log(err))
    }

  

    function deletePost(id) {
        API.deletePost(id)
          .then(res => loadPost())
          .catch(err => console.log(err));
      }
    

    return(
        <>
        {/* {loggedIn ? ( */}
            <Grid columns="equal">
                <Grid.Column>
                </Grid.Column>
                <Grid.Column width ={10}>
                    <Card.Group >
                        <h1>newsfeed</h1>
                        {AllPost && AllPost.map(post => (
                            <Card fluid color="blue" key={post._id} style={style.h1}>
                                <Card.Content>
                                    <Image floated="right" size="mini" src={post.userId.profilePic}/>
                                    <Card.Header> 
                                        <h4>{post.userId.username}</h4>   
                                    </Card.Header> 
                                    <Card.Meta>
                
                                        {moment(post.createdAt).startOf("hour").fromNow()} 
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
                                <Card.Content extra>  
                                    
                                </Card.Content>
                                <Comments post={post._id} style={style.h1}/>                            
                            </Card>
                            ))}
                    </Card.Group>
              </Grid.Column>
                 
                 <Grid.Column>
                <SportTicket />
                <Edit />
              </Grid.Column>
            </Grid>
        {/* ) : (          
        <Login />       
        )}      */}
    </>
    )
}

export default Newsfeed;