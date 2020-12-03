import React, {useState, useContext} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import {  Divider, Card, Grid, Segment, Image, Form, Radio } from 'semantic-ui-react'
import API from '../../utils/API'
import UserContext from '../../utils/UserContext'

function UpdateResults({bet}) {
  const [open, setOpen] = useState(false)
  const [winner, setWinner] = useState("")
  const {user}= useContext(UserContext)

  const handleChange = (e, { value }) => setWinner({ value })

  const submitWinner = (id,competitor) => {
      API.settleBet({
          sportTicket: id,
          winner: winner.value,
          competitor: competitor,
          updater: user._id
    })
    .then(setOpen(false))
  }
 
  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button compact content='Update Results' icon='signup' size='medium' />
    }
    >
    
      <Modal.Header  key={bet._id}>Ticket #{bet._id}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Card raised fluid>
                                <Card.Content>
                                    <Image size="tiny" circular floated="right" src={bet.competitor.profilePic} />
                                    <Card.Header>{bet.competitor.username}</Card.Header>
                                </Card.Content>
                            </Card>                                
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Card raised fluid>
                                <Card.Content>
                                    <Image size="tiny" floated="right" circular src={bet.userId.profilePic}  />
                                    <Card.Header >{bet.userId.username}</Card.Header>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    
                    <Divider vertical>VS</Divider>
                    {bet.userId.username===user.username ? (
                            <Card raised centered>
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
                                <Card.Content  extra>
                                    <Card.Header>Who won?</Card.Header>
                                    <Form>
                                        <Form.Field>
                                        <Radio
                                            label={bet.userId.username}
                                            name='radioGroup'
                                            value= {bet.userId._id}
                                            checked={winner.value === bet.userId._id}
                                            onChange={handleChange}
                                        />
                                        </Form.Field>
                                        <Form.Field>
                                        <Radio
                                            label={bet.competitor.username}
                                            name='radioGroup'
                                            value= {bet.competitor._id}
                                            checked={winner.value === bet.competitor._id}
                                            onChange={handleChange}
                                        />
                                        </Form.Field>
                                    </Form>
                                    <Button floated="right" compact content="Submit" onClick={()=>submitWinner(bet._id,bet.competitor._id)}  color="green" />
                                </Card.Content>
                            </Card>
                        ):(<></>)}
                    {bet.competitor.username===user.username ? ( 
                             <Card centered>
                                <Card.Content>
                                <Card.Header>{bet.userId.username} wagered ${bet.wager} against you .</Card.Header>
                                    {bet.sportTicket.map(ticket=>(
        
                                <Card.Description key={ticket._id,bet.userId.username}>{bet.competitor.username}  picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[1]} game.</strong> </Card.Description>
                                        
                                ))}
                                </Card.Content>
                                <Card.Meta>
                                        Ticket Ref Number: {bet._id}
                                </Card.Meta>
                                <Card.Content  extra>
                                    <Card.Header>Who won?</Card.Header>
                                    <Form>
                                        <Form.Field>
                                        <Radio
                                            label={bet.userId.username}
                                            name='radioGroup'
                                            value= {bet.userId._id}
                                            checked={winner.value === bet.userId._id}
                                            onChange={handleChange}
                                        />
                                        </Form.Field>
                                        <Form.Field>
                                        <Radio
                                            label={bet.competitor.username}
                                            name='radioGroup'
                                            value= {bet.competitor._id}
                                            checked={winner.value === bet.competitor._id}
                                            onChange={handleChange}
                                        />
                                        </Form.Field>
                                    </Form>
                                    <Button floated="right" compact content="Submit" onClick={()=>submitWinner(bet._id,bet.competitor._id)}  color="green" />
                                </Card.Content>
                            </Card>
                     ):(<></>)} 
                    
                </Grid>
        </Modal.Description>
        
      </Modal.Content>
      <Modal.Actions>
        <Button color ="red" onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateResults
