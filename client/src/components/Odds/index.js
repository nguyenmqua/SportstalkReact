import React, { useState, useEffect} from 'react';
import { Button, Modal,Card, Table } from 'semantic-ui-react'
import API from '../../utils/API';

const Odds = () => {
    const [Open, setOpen] = useState(false)
    const [NFLgames, setNFLgames] = useState([])
    const [pickEm, setPickEm] = useState({})


    useEffect(()=>{
        // API.getNFL()
        // .then(res => {
        //     console.log(res.data)
        //     setNFLgames(res.data)
        //     })
    }, []);
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button style={{ backgroundColor:"#008ae6", color:"white", marginTop:'5px', borderStyle: "outset" }}>Sportsbooks</Button>}
        >
        <Modal.Header>Compare Sportsbook</Modal.Header>
        <Modal.Content scrolling>
            <Modal.Description>
            <Card.Group>
            {NFLgames.map(game=>( 
                
                <Card fluid color='green' key={game.teams[0]+game.teams[1]}>
                    <Card.Content>
                        <Card.Header color="blue">{game.teams[0] + " vs " + game.teams[1]}</Card.Header>
                        <Table celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell rowSpan={game.sites_count}>SportBook Sites</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='2'>Points Spread</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='2'>Odds</Table.HeaderCell> 
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>{game.teams[0]}</Table.HeaderCell>
                                    <Table.HeaderCell>{game.teams[1]}</Table.HeaderCell>
                                    <Table.HeaderCell>{game.teams[0]}</Table.HeaderCell>
                                    <Table.HeaderCell>{game.teams[1]}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {game.sites.map(site=>(
                                <Table.Row key={site.site_key}>
                                    <Table.Cell >{site.site_nice}</Table.Cell>
                                    <Table.Cell>{site.odds.spreads.points[0]}</Table.Cell>
                                    <Table.Cell>{site.odds.spreads.points[1]}</Table.Cell>
                                    <Table.Cell>{site.odds.spreads.odds[0]}</Table.Cell>
                                    <Table.Cell>{site.odds.spreads.odds[1]}</Table.Cell>
                                </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                     </Card.Content>
                </Card>
            ))} 
            </Card.Group>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
        
      </Modal>
    </>
    )
};

export default Odds