import React, { useContext } from 'react';
import UserContext from '../../utils/UserContext'
import { Card, Grid} from 'semantic-ui-react'

const Results = ({allBets}) =>{
    const {user} = useContext(UserContext)

    return (
        <Grid centered columns={4} stackable>
            <Grid.Row>
        {allBets.map(bet => (
            <>
            {bet.completed ===true? (
                <Grid.Column style={{marginTop:"10px"}}>
                    <Card>
                        <Card.Content>
                            <Card.Header>ticket # {bet._id}</Card.Header>
                            <Card.Description>
                                {bet.userId.username} wagered ${bet.wager} on the {bet.sportTicket[0][1]} at {bet.sportTicket[0][2]} in the {bet.sportTicket[0][0]} game.
                            </Card.Description>
                        </Card.Content>
                        {bet.winner._id===user._id ? (
                        <Card.Content extra>
                               <Card.Header >Congrats! You won this wager for {bet.wager}</Card.Header>
                        </Card.Content>
                        ):(
                        <Card.Content extra>
                            <Card.Header >Sorry! You loss this wager for {bet.wager}</Card.Header>
                        </Card.Content>
                        )}
                        
                    </Card>


                </Grid.Column>                 
            ):(<></>)}
            </>
            ))}

            </Grid.Row>
        </Grid>
    )
}

export default Results