import React, { useEffect, useContext, useState} from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API"
import { Container, Row, Col, Card, Button, CardHeader, Input, CardFooter, CardBody, CardTitle, CardText  } from 'reactstrap';
import UserContext from "../utils/UserContext"

function Message(props){
    const {user} = useContext(UserContext)
    const [CurrentPost, setCurrentPost] = useState({})
    const [CurrentPostAuthor, setCurrentPostAuthor] = useState("")
    const [Comment, setComment] = useState("")
    const [DisplayComments, setDisplayComments] = useState([])
    // When this component mounts, grab the book with the _id of props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    const {id} = useParams()
    useEffect(() => {
      loadPost()
    }, [])

    function loadPost(){
        API.getPost(id)
        .then(res => {
            setCurrentPost(res.data) 
            setCurrentPostAuthor(res.data.userId.username) 
            setDisplayComments(res.data.Comments)
        })
        .then(()=> console.log(CurrentPostAuthor))
        .catch(err => console.log(err))
        }

    function deletePost(id) {
        API.deletePost(id)
          .then(res => loadPost())
          .catch(err => console.log(err));
      }
    
      const handleUserBtnClick = async (e) => {
        try {
          const res = await API.postComment({
            comment: Comment,
            userId: user._id,
            postid: id
          })
          window.location.href = "/post/" +id
        } catch (error) {
          console.log(
            "There was an error processing your results, please try again",
            error
          );
        }
      }

    return(
        <Container fluid>
            <Row>
                <Col sm="12" md={{ size: 12 }} >
                <Card key={CurrentPost._id}>
                            <CardHeader> User: {CurrentPostAuthor} Subject: {CurrentPost.subject}
                                <Button className="float-right" close onClick={() => deletePost(CurrentPost._id)} />
                            </CardHeader>   
                            <CardBody>
                                <CardTitle>Notes:
                                    <CardText>{CurrentPost.notes}</CardText>
                                </CardTitle>
                                <CardTitle>Group Size
                                    <CardText>{CurrentPost.group}</CardText>
                                </CardTitle>
                                <CardTitle>Location</CardTitle>
                                <CardText>{CurrentPost.location}</CardText>
                            </CardBody>
                            <CardFooter>
                                {CurrentPost.date}
                            </CardFooter>                            
                        </Card>
                </Col>
            </Row>
            <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} >
                    {DisplayComments.map(comment => (
                        <Card key={comment._id}>
                            <CardBody>
                            <b>{comment.userId.username}</b>:  {comment.comment} 
                            </CardBody>
                            <CardFooter>
                                {comment.date}
                            </CardFooter>                     
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col sm="12" md={{size:8, offset: 2}}>
                    <Card>
                        <CardHeader>Reply</CardHeader>
                        <CardBody>
                            <Input type="text"  onChange={(e) => setComment(e.target.value)}>
                            </Input>
                        </CardBody>
                    <Button onClick={handleUserBtnClick}>Submit</Button>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Message;