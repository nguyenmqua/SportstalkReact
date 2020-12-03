import React, { useContext } from "react";
import { Form,  Image, Card} from "semantic-ui-react"
import UserContext from '../../utils/UserContext';



function Post(props) {
  const { user, setPost, handleUserBtnClick } = useContext(UserContext);
  
  return (
      <> 
      <Card.Group className="post">
        <Card fluid color="blue">
          <Card.Content>
            <Card.Header  style={{ color:"#008ae6" }} as="h2">
              <Image circular size="mini" src={user && user.profilePic}/>{user && user.firstname}, what is on your mind?
            </Card.Header>
            <Card.Description>
              <Form>
                <Form.TextArea onChange={(e) => setPost(e.target.value)} placeholder='What sup?' />
                <Form.Button floated="right" color="green" onClick ={handleUserBtnClick}>Post</Form.Button>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      </>
    );
  }


export default Post;
