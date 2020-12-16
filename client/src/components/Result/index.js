import React, { useContext } from 'react';
import UserContext from '../../utils/UserContext'
import { Card, Grid} from 'semantic-ui-react'
import moment from "moment"

const Results = ({allResults}) =>{
    const {user,footballColor} = useContext(UserContext)

    return (
        <Grid style={{backgroundColor: "#002244" }} centered  stackable>
            <Grid.Row>
        {allResults.map(bet => (
            <div key={bet._id+bet.completed}>
            {bet.completed ===true? (
                    <Grid.Column style={{margin:"10px", backgroundColor: "#d3d3d3"}}width={4} >
                        <Card style={{backgroundColor: "#d3d3d3"}}centered>
                        <Card.Content>
                            <Card.Header id="headers">ticket # {bet._id}</Card.Header>
                            <Card.Description style={{backgroundColor:footballColor(bet.sportTicket[0][1]).primary, color:footballColor(bet.sportTicket[0][1]).secondary}}>
                                {bet.userId.username} wagered ${bet.wager} on the {bet.sportTicket[0][1]} at {bet.sportTicket[0][2]} in the {bet.sportTicket[0][0]} game.
                            </Card.Description>
                        </Card.Content>
                        {bet.winner._id===user._id ? (
                            <>
                        <Card.Content extra>
                               <Card.Header style={{color:"green"}}>Congrats! You won this wager for {bet.wager}. Good win {bet.winner.username}!</Card.Header>
                        </Card.Content>                               
                         <Card.Meta>{moment(bet.createdAt).fromNow}</Card.Meta>

                        </>
                        
                        ):(
                            <>
                        <Card.Content extra>
                            <Card.Header style={{color: "red"}}>Sorry! You loss this wager for ${bet.wager}. {bet.winner.username} won this bet.</Card.Header>
                        </Card.Content>
                        <Card.Meta>{moment(bet.createdAt).fromNow}</Card.Meta>
                        </>
                        )}                   
                    </Card>
                </Grid.Column>                 
            ):(<></>)}
            </div>
            ))}

            </Grid.Row>
        </Grid>
    )
}

export default Results