import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import { Button, Modal, Table, Label, Grid,Card, Input } from 'semantic-ui-react'
import API from '../../utils/API';
import SearchForm from '../../components/SearchForm'

const Bet = () => {
    const {user} = useContext(UserContext)
    const [Open, setOpen] = useState(false);
    const [NFLgames, setNFLgames] = useState([]);
    const [pickEm, setPickEm] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("")
    const [wager, setWager] = useState({})
  

    useEffect(()=>{
        loadNFL();
        loadUsers();
    }, []);

    const handleChange = (event, { value}) => {
        setPickEm(arr=>[...arr, value])
    }

    const handleSubmit = () => {
        const bets = {
            sportTicket: pickEm,
            competitor: search,
            userId: user._id
        }
        API.postBet(bets)
        .then (res=>{console.log(res)})
        .catch (err=>{console.log(err)})
    }
    const loadNFL = () => {
        API.getNFL()
        .then(res => {
            console.log(res.data)
            setNFLgames(res.data)
            })
        }

    const loadUsers = () => {
        API.getUsers()
        .then(res=>{
           setUsers(res.data)
        })
    }

    const handleInputChange = event => {
        setSearch(event.target.value);
      };
    
    const handleInputBet = (event, {name}) => {
        setWager(event.target.value)
    }
    
    
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Make Bet</Button>}
        >
        <Modal.Header>Betting Odds</Modal.Header>
        <Modal.Content scrolling>
            <Modal.Description>
            <Grid columns={2} padded='vertically'>
                <Grid.Column>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Home Team</Table.HeaderCell>
                            <Table.HeaderCell >Away Team</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    
                    <Table.Body>
                        {NFLgames.map(game =>(
                       <Table.Row  key={game.home_team+game.teams[0]+game.teams[1]}>    
                            <Table.Cell>
                                <Button 
                                    as='div' 
                                    labelPosition='right'
                                    name= {game.teams[0] + " vs " + game.teams[1]}
                                    value = {[ game.teams[0] + " vs " + game.teams[1],game.teams[0], game.sites[0].odds.spreads.points[0]]}
                                    onClick={handleChange}>
                                <Button icon>
                                    {game.teams[0]}
                                    </Button>
                                    <Label  basic pointing='left'>
                                        {game.sites[0].odds.spreads.points[0]}
                                    </Label>
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button 
                                    as='div' 
                                    labelPosition='right'
                                    name= {game.teams[0] + " vs " + game.teams[1]}
                                    value = {[game.teams[0] + " vs " + game.teams[1],game.teams[1],game.sites[0].odds.spreads.points[1]]}
                                    onClick={handleChange}>
                                    <Button icon>
                                    {game.teams[1]}
                                    </Button>
                                    <Label  basic pointing='left'>
                                        {game.sites[0].odds.spreads.points[1]}
                                    </Label>
                                </Button>
                            </Table.Cell>
                            
                            </Table.Row>
                        ))}
                    </Table.Body>
                    </Table>
                    </Grid.Column>

                    
                    <Grid.Column>
                        {pickEm.length > 0 ? (  
                        <Card>   
                            <Card.Content>
                                <Card.Header>Sports Ticket</Card.Header>
                                <Card.Group>
                                    {pickEm.map(pick=>(  
                                        <Card fluid color='red' key={pick[0]+pick[1]+pick[2]}>
                                            <p>Game: {pick[0]}</p>
                                            <p>Pick: {pick[1]}</p>
                                            <p>Spread: {pick[2]}</p>
                                        </Card> 
                                    ))}

                                    <Button fluid onClick={()=>setPickEm([])}>Clear</Button>
                                    <SearchForm
                                        handleInputChange={handleInputChange}
                                        users={users}
                                        search = {search}
                                    />
                                    <Input onChange={handleInputBet} labelPosition='right' type='text' placeholder='Amount'>
                                        <Label basic>$</Label>
                                        <input />
                                        <Label>.00</Label>
                                    </Input>

                                </Card.Group>
                            </Card.Content>
                        </Card> 
                        ):(<p></p>)}
                    </Grid.Column> 
                </Grid>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
        
      </Modal>
    </>
    )
};

export default Bet