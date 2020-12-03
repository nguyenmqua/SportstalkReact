import React, { useEffect, useContext, useState} from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API"
import { Button, Icon, Image, Item, Label, Card, Table } from 'semantic-ui-react'
import UserContext from "../utils/UserContext"
import moment from "moment"

function Wager(props){
    const {user} = useContext(UserContext)
    const [currentWager, setCurrentWager] = useState({})
    const [currentWagerAuthor, setCurrentWagerAuthor] = useState({})
    const [currentSportTicket, setCurrentSportTicket] = useState([])
    
    
    const {id} = useParams()
    useEffect(() => {
      loadWager()
    }, [])

    const handleBetApproval = () =>{
      API.updateBet({
        id:id,
        userId: user._id,
        competitor: currentWagerAuthor._id
      })
      .then(res=>{window.location.href = '/'}) 
      .catch(err=>console.log(err))
    }


    const loadWager=()=>{
        API.getBet(id)
        .then(res => {
          console.log(res.data)
           setCurrentWager(res.data)
           setCurrentWagerAuthor(res.data.userId)
           setCurrentSportTicket(res.data.sportTicket)
        })
        .catch(err => console.log(err))
        }

    
      const handleFinalApporval =() =>{
        API.completeBet({id:id})
        .then(window.location.href ="/")
      }

      const handleEdit = () =>{
        console.log("edit")
      }

    return(
      <Card.Group centered>
        <Card>
          <Card.Content>
            <Image floated="left" circular size='tiny' src={currentWagerAuthor.profilePic} />           
              <Card.Header>{currentWagerAuthor.username}</Card.Header>
              <Card.Meta>
                <span className='cinema'>{moment(currentWager.createdAt).startOf("hour").fromNow()} </span>
              </Card.Meta>
              <Card.Description>
              <Card.Header>Wager: $ {currentWager.wager}</Card.Header>
                <Table celled compact definition >
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Game</Table.HeaderCell>
                            <Table.HeaderCell>Selection</Table.HeaderCell>
                            <Table.HeaderCell>Spread</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {currentSportTicket.map(ticket=>(
                        <Table.Row key={ticket[0]}>
                            <Table.Cell>
                              {ticket[0]}
                            </Table.Cell>
                            <Table.Cell>
                              {ticket[1]}
                            </Table.Cell>
                            <Table.Cell>
                              {ticket[2]}
                            </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                </Table>
              </Card.Description>
            </Card.Content>
          {!currentWager.winner ? (
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button onClick={handleBetApproval} compact color='green'>
                Approve 
              </Button>
              <Button compact color='red'>
                Decline 
              </Button>
            </div>
          </Card.Content>
          ):(
            <Card.Content extra>
              <Card.Header>Winner: {currentWager.winner.username}</Card.Header>
            <div className='ui two buttons'>
              <Button onClick={handleFinalApporval} compact color='green'>
                Approve 
              </Button>
              <Button onClick={handleEdit} compact color='red'>
                Decline 
              </Button>
            </div>
          </Card.Content>
          )}
          
        </Card>
    </Card.Group>   
    )
}

export default Wager;