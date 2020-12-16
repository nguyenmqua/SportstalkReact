import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { Card, Grid, Icon, Image, Popup } from "semantic-ui-react";
import moment from "moment";
import Comments from "../Comments";

const UserPost = ({ AllPost }) => {
  const { user, deletePost } = useContext(UserContext);

  return (
    <Grid style={{ backgroundColor: "#002244" }} columns={2} centered stackable>
      <Grid.Row>
        <Grid.Column>
          {AllPost &&
            AllPost.map((post) => (
              <Card key={post._id} style={{ backgroundColor: "#d3d3d3" }} centered>
                <Card.Content>
                  <Icon
                    color="red"
                    className="float-right"
                    fitted
                    name="close"
                    onClick={() => deletePost(post._id)}
                  />
                  <Popup
                    content={
                      "Member Since " +
                      moment(post.userId.creatAt).format("MMMM  YYYY")
                    }
                    header={post.userId.username}
                    trigger={
                      <Image
                        floated="left"
                        size="tiny"
                        circular
                        src={post.userId.profilePic}
                      />
                    }
                  />
                  <Card.Header as="a">
                    <h4>{post.userId.username}</h4>
                  </Card.Header>
                  <Card.Meta>
                    {moment(post.createdAt).startOf("hour").fromNow()}
                  </Card.Meta>
                  <Card.Description>
                    <h2>{post.post}</h2>
                  </Card.Description>
                </Card.Content>
                <Comments post={post._id} />
              </Card>
            ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UserPost;
