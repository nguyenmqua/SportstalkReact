import React, { useContext } from 'react';
import UserContext from '../../utils/UserContext'

import {  Header, Grid, Segment, Image, Card } from 'semantic-ui-react'
import UpdateResults from '../UpdateResults';

const UserBet = ({allBets}) =>{
    const {user} = useContext(UserContext)

    return (
        
        <> 
        <Grid stackable>
            <Grid.Row>
                {allBets.map(bet=>(
                <Grid.Column computer={4} mobile={1}>
                    {bet.completed===false ? ( 
                        <Segment>
                            <Grid centered divided="vertically" columns={2}>
                                <Grid.Row only="computer">
                                        <Grid.Column width={5}>               
                                            <Image size="tiny" circular floated="right" src={bet.competitor.profilePic} />
                                            <Header>{bet.competitor.username}</Header>                      
                                        </Grid.Column>
                                        <Grid.Column width={2}>               
                                            <Header>vs</Header>                      
                                        </Grid.Column>
                                        <Grid.Column width={5}>       
                                            <Image size="tiny" floated="left" circular src={bet.userId.profilePic}></Image>
                                            <Header floated="right">{bet.userId.username}</Header>
                                        </Grid.Column> 
                                    </Grid.Row>
                                    <Grid.Row>
                                    {bet.userId.username===user.username ? (
                                        <Card centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    You wagered ${bet.wager} against {bet.competitor.username}.
                                                </Card.Header>
                                                    {bet.sportTicket.map(ticket=>(
                                                        <>
                                                <Card.Description key={bet._id} >
                                                    You picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[1]} game.</strong> 
                                                </Card.Description>
                                                <Card.Meta>
                                                    Ticket Ref Number: {bet._id}
                                                </Card.Meta>
                                                </>
                                                ))}
                                            </Card.Content>
                                        </Card>
                                    ):(<></>)}
                                    {bet.competitor.username===user.username ? ( 
                                        <Card centered>
                                            <Card.Content>
                                            <Card.Header>{bet.userId.username} wagered ${bet.wager} against you .</Card.Header>
                                                {bet.sportTicket.map(ticket=>(
                                            <Card.Description key={ticket._id,bet.userId.username}>{bet.userId.username}  picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[1]} game.</strong> </Card.Description>
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
                    ):(<></>)}

                </Grid.Column> 
                ))}
            </Grid.Row>
        </Grid>
        </>
        
    )
}

export default UserBet