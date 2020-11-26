import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API"
import { Button, Comment, Form, TextArea } from 'semantic-ui-react'
import UserContext from '../../utils/UserContext';
import moment from 'moment'

const style = {
  h1: {
    marginTop: "10px",
    padding: "5px"
  },
    button: {
     padding: "10px"
  }
}



const CommentSection = ({ post }) => {
    const { loggedIn, user} = useContext(UserContext);
    const [Comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [showComment, setshowComment] = useState(false)

    useEffect(() => {
        loadComments()
      }, [])

    const loadComments = () => {
        API.getComment(post)
        .then(res => {
             setComments(res.data)  
        })
    }

    const handleCommentPost = (event) =>{
      event.preventDefault();
        API.postComment({
            comment: newComment,
            userId: user._id,
            postId: post
        })
        .then( res=>{
          setNewComment("")
          setComments(res.data.Comments) 
    
        })
        .catch(err =>
            console.log(err)
        )
    }
    function showCommentInfo(){
      setshowComment(!showComment)
  }
    return (
             <>
             <Button color= "blue" style = {style.button} onClick={showCommentInfo}>
                  Comments
            </Button>
            {showComment ? (
              <>
              <Form style={style.h1}>
                <TextArea value={newComment} rows={2} onChange={(e) => setNewComment(e.target.value)} placeholder='Reply here' />
                <Form.Button style={style.h1} content='Add Reply' floated="right"labelPosition='left' icon='edit' primary onClick={handleCommentPost}/>
              </Form>
              <Comment.Group>
              {Comments.map(comment=>(
                <Comment key={comment._id}>
                <Comment.Avatar src={comment.userId.profilePic} />
                <Comment.Content>
                  <Comment.Author as='a'>{comment.userId.username}</Comment.Author>
                  <Comment.Metadata>
                    <div> {moment(comment.date).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.comment}</Comment.Text>
                </Comment.Content>
              </Comment> 
            ))}
              </Comment.Group> 
                </> 
            ):(<p></p>)}
                 </> 
        )
    }

export default CommentSection