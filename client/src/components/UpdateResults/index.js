import React, {useState, useContext} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { Header, Card, Grid, Segment, Image, Form, Radio } from 'semantic-ui-react'
import API from '../../utils/API'
import UserContext from '../../utils/UserContext'

function UpdateResults({bet}) {
  const [open, setOpen] = useState(false)
  const [winner, setWinner] = useState("")
  const {user, footballColor}= useContext(UserContext)

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
        style={{backgroundColor: "#002244" }}
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button  color="green" compact content='Update Results' icon='signup' size='medium' />
    }
    >
    
      <Modal.Header id="headers" style={{backgroundColor: "#d3d3d3" , fontSize:"24px"}}   >Ticket #{bet._id}</Modal.Header>
      <Modal.Content scrolling style={{backgroundColor: "#002244" }} >
        <Modal.Description>
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
                            <Card raised centered>
                                <Card.Content>
                                    <Card.Header>
                                        You wagered ${bet.wager} against {bet.competitor.username}.
                                    </Card.Header>
                                        {bet.sportTicket.map(ticket=>(
                                            <div key={ticket[1]+bet.competitor.username+ticket[0]+ticket[2]} >
                                    <Card.Description style={{backgroundColor:footballColor(ticket[1]).primary, color: footballColor(ticket[1]).secondary}}  >
                                        You picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[0]} game.</strong> 
                                    </Card.Description>
                                    <Card.Meta>
                                        Ticket Ref Number: {bet._id}
                                    </Card.Meta>
                                    </div>
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
        
                                    <Card.Description style={{backgroundColor:footballColor(ticket[1]).primary, color: footballColor(ticket[1]).secondary}}  >
                                {bet.competitor.username}  picked the <strong>{ticket[1]}</strong> at <strong>{ticket[2]}</strong> in the <strong>{ticket[1]} game.</strong> </Card.Description>
                                        
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
                                    <Button floated="right" compact content="Submit" onClick={()=>submitWinner(bet._id,bet.userId._id)}  color="green" />
                                </Card.Content>
                            </Card>
                     ):(<></>)} 
                    
                     </Grid.Row>
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
