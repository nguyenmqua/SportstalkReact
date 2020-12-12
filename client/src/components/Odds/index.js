import React, { useState, useEffect, useContext} from 'react';
import { Button, Modal,Card, Table } from 'semantic-ui-react'
import API from '../../utils/API';
import UserContext from "../../utils/UserContext"

const Odds = () => {
    const [Open, setOpen] = useState(false)
    const [NFLgames, setNFLgames] = useState([])
    const {footballColor} = useContext(UserContext)
  
    useEffect(()=>{
        API.getNFL()
        .then(res => {
            console.log(res.data)
            setNFLgames(res.data)
            })
    }, []);
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button id="headers" color="blue" style={{fontSize: "24px", color:"#000000"}}>Compare Sportsbooks</Button>}
        >
        <Modal.Header id="headers" style={{fontSize: "50px" ,backgroundColor: 'grey'}}>Compare Sportsbook</Modal.Header>
        <Modal.Content scrolling>
            <Modal.Description>
            <Card.Group>
            {NFLgames.map(game=>( 
                
                <Card fluid style={{color:footballColor(game.teams[1]).primary, backgroundColor:footballColor(game.teams[0]).secondary}} key={game.teams[0]+game.teams[1]}>
                    <Card.Content>
                        <Card.Header style={{color:footballColor(game.teams[0]).primary, backgroundColor:footballColor(game.teams[0]).secondary}}>{game.teams[0] + " vs " + game.teams[1]}</Card.Header>
                        <Table celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell id="headers" style={{fontSize: "18px"}}rowSpan={game.sites_count}>SportBook Sites</Table.HeaderCell>
                                    <Table.HeaderCell id="headers" style={{fontSize: "18px"}}colSpan='2'>Points Spread</Table.HeaderCell>
                                    <Table.HeaderCell id="headers" style={{fontSize: "18px"}}colSpan='2'>Odds</Table.HeaderCell> 
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell style={{color:footballColor(game.teams[0]).primary, backgroundColor:footballColor(game.teams[0]).secondary}}>{game.teams[0]}</Table.HeaderCell>
                                    <Table.HeaderCell style={{color:footballColor(game.teams[1]).primary, backgroundColor:footballColor(game.teams[1]).secondary}}>{game.teams[1]}</Table.HeaderCell>
                                    <Table.HeaderCell style={{color:footballColor(game.teams[0]).secondary, backgroundColor:footballColor(game.teams[0]).primary}}>{game.teams[0]}</Table.HeaderCell>
                                    <Table.HeaderCell style={{color:footballColor(game.teams[1]).secondary, backgroundColor:footballColor(game.teams[1]).primary}}>{game.teams[1]}</Table.HeaderCell>
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