import React, { useContext } from 'react';
import UserContext from '../../utils/UserContext'
import moment from "moment"
import {  Header, Grid, Segment, Image, Card } from 'semantic-ui-react'
import UpdateResults from '../UpdateResults';

const UserBet = ({allBets}) =>{

    const {footballColor, user} = useContext(UserContext)

    return ( 
        <> 
        <Grid style={{backgroundColor: "#002244" }} columns={4} centered  stackable>
            <Grid.Row >
                {allBets.map(bet=>(
                    <div key={bet._id+bet.completed}>
                    {bet.completed===false ? (
                    <Grid.Column style={{margin:"10px", backgroundColor: "white", padding: "10px"}}width={4} >
                        <Segment compact style={{backgroundColor:"white"}}>
                        <Grid centered divided="vertically" columns={2}>
                                <Grid.Row style={{backgroundColor: "#d3d3d3" }} only="computer">
                                        <Grid.Column width={5}>               
                                            <Image size="small" circular floated="right" src={bet.competitor.profilePic} />
                                            <Header id="headers">{bet.competitor.username}</Header>                      
                                        </Grid.Column>
                                        <Grid.Column width={1}>               
                                            <Header>vs</Header>                      
                                        </Grid.Column>
                                        <Grid.Column width={5}>       
                                            <Image size="small" floated="left" circular src={bet.userId.profilePic}></Image>
                                            <Header id="headers">{bet.userId.username}</Header>
                                        </Grid.Column> 
                                    </Grid.Row>
                                    <Grid.Row>
                                    {bet.userId.username===user.username ? (
                                        <Card style={{backgroundColor: "#d3d3d3"}}centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    You wagered ${bet.wager} against {bet.competitor.username}.
                                                </Card.Header>
                                                    {bet.sportTicket.map(ticket=>(
                                                        <div key={ticket[1]}>
                                                <Card.Description style={{backgroundColor:footballColor(ticket[1]).primary, color:footballColor(ticket[1]).secondary}}>
                                                    You picked the <strong >{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[0]} game.</strong> 
                                                </Card.Description>
                                                <Card.Meta>
                                                    Ticket Ref Number: {bet._id}
                                                </Card.Meta>
                                                <Card.Meta>{moment(bet.createdAt).fromNow}</Card.Meta>
                                                </div>
                                                ))}
                                            </Card.Content>
                                        </Card>
                                    ):(<></>)}
                                    {bet.competitor.username===user.username ? ( 
                                        <Card style={{backgroundColor: "#d3d3d3"}}centered>
                                            <Card.Content>
                                            <Card.Header >{bet.userId.username} wagered ${bet.wager} against you .</Card.Header>
                                                {bet.sportTicket.map(ticket=>(
                                                <Card.Description style={{backgroundColor:footballColor(ticket[1]).primary, color:footballColor(ticket[1]).secondary}}>
                                            {bet.userId.username}  picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[0]} game.</strong> </Card.Description>
                                            ))}
                                            </Card.Content>
                                            <Card.Meta>
                                                    Ticket Ref Number: {bet._id}
                                            </Card.Meta>
                                        </Card>
                                        ):(<></>)} 
                                    </Grid.Row>     
                                    <Grid.Row>
                                        <UpdateResults key={bet._id} bet={bet} />    
                                    </Grid.Row>         
                                </Grid>
                                </Segment>
                            </Grid.Column> 
                    ):(<></>)}
                
                </div>
                ))}
                
            </Grid.Row>
        
        </Grid>
        </>
        
    )
}

export default UserBet