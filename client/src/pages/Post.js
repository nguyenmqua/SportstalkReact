import React, { useState, useContext } from "react";
import API from "../utils/API"
import { Form, Header, Image, Card} from "semantic-ui-react"
import UserContext from '../utils/UserContext';
import Login from "../components/Login"
import styled from "styled-components"

const Div = styled.div`
   padding: 10px;
`;



function Member(props) {
  const { user,  loggedIn } = useContext(UserContext);
  const [Post, setPost] = useState("")
  
  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

  const handleUserBtnClick = async (e) => {
    try {
      const res = await API.postPost({
        post: Post,
        userId: user

      })
      window.location.href = "/newsfeed"
    } catch (error) {
      console.log(
        "There was an error processing your results, please try again",
        error
      );
    }
  }

  return (
      <> 
      {/* {loggedIn ? ( */}
        
       <Card.Group className="post">
        <Card  fluid color="blue"><Div>
          <Header as="h2">
            <Image circular src='/images/avatar/large/patrick.png'/>{user && user.firstname}, what is on your mind?
          </Header>
          <Form>
            <Form.TextArea onChange={(e) => setPost(e.target.value)} placeholder='What sup?' />
            <Form.Button onClick ={handleUserBtnClick}>Submit</Form.Button>
          </Form>
          </Div></Card>
      </Card.Group>
    
         {/* ) : (
          <Login />  
        )} */}
      </>
    );
  }


export default Member;
