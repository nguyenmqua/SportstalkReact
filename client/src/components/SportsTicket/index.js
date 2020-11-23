import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import { Button, Modal, Table, Form,Radio, Tab } from 'semantic-ui-react'
import API from '../../utils/API';

const SportTicket = () => {
    const [Open, setOpen] = useState(false)
    const [NFLgames, setNFLgames] = useState([])
    const [pickEm, setPickEm] = useState({})

    const handleChange = (event, {name, value}) => {
    
       setPickEm({...pickEm, [name]: value})
    }

    const handleSubmit = () => {
        console.log(pickEm)
    }

    useEffect(()=>{
        // API.getNFL()
        // .then(res => {
        //     setNFLgames(res.data)
        //     console.log(res.data)})
    }, []);
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>NFL Pick'Em</Button>}
        >
        <Modal.Header>Football Pick'em</Modal.Header>
        <Modal.Content scrolling>
            <Modal.Description>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Home Team</Table.HeaderCell>
                        <Table.HeaderCell>VS</Table.HeaderCell>
                        <Table.HeaderCell>Away Team</Table.HeaderCell>   
                    </Table.Row>
                    </Table.Header>
                    
                    <Table.Body>
                    {NFLgames.map(game =>(
                       <Table.Row key={game.home_team}>        
                        <Table.Cell>
                        <Radio
                            label={game.teams[0]}
                            name= {game.teams[0] + " vs " + game.teams[1]}
                            value = {game.teams[0]}
                            checked = {pickEm.value === game.teams[0]}
                            onChange={handleChange}
                            />  
                        </Table.Cell>
                        <Table.Cell>VS</Table.Cell>
                        <Table.Cell>
                            <Radio
                            label={game.teams[1]}
                            name={game.teams[0] + " vs " + game.teams[1]}
                            value={game.teams[1]}
                            checked = {pickEm.value === game.teams[1]}
                            onChange={handleChange}
                            />
                        </Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
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

export default SportTicket