import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/UserContext";
import {
  Button,
  Modal,
  Table,
  Label,
  Grid,
  Card,
  Input,
  Dimmer, 
  Loader
} from "semantic-ui-react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";



const Bet = () => {
  const { user, footballColor } = useContext(UserContext);
  const [Open, setOpen] = useState(false);
  const [NFLgames, setNFLgames] = useState([]);
  const [pickEm, setPickEm] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [wager, setWager] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNFL();
    loadUsers();
  }, []);

  const handleChange = (event, { value }) => {
    setPickEm((arr) => [...arr, value]);
  };

  const handleSubmit = () => {
    const bets = {
      sportTicket: pickEm,
      competitor: search,
      userId: user._id,
      wager: wager,
    };
    API.postBet(bets)
      .then((res) => {
        setOpen(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadNFL = () => {
    setLoading(true)
    API.getNFL().then((res) => {
      setLoading(false)
      setNFLgames(res.data);
    });
  };

  const loadUsers = () => {
    setLoading(true)
    API.getUsers().then((res) => {
      setUsers(res.data);
      setLoading(false)
    });
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  
  const handleInputBet = (event, { name }) => {
    setWager(event.target.value);
  };

  return (
    <>
      <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          <Button id="headers" color="blue" style={{fontSize: "24px", color:"#000000"}}>Bet-a-Buddy</Button>
        }
      >
          {loading ? (
                <Dimmer active>
                   <Loader content='Loading' />
                 </Dimmer>
               ):(
                 <>
        
        <Modal.Header id="headers" style={{fontSize: "50px"}}>Betting Odds</Modal.Header>
        <Modal.Content  style={{backgroundColor: "#002244" }} scrolling>
          <Modal.Description>
            <Grid stackable reversed="mobile" columns={2} padded="vertically">
              <Grid.Column>
                <Table celled compact definition>
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell id="headers" style={{fontSize: "20px"}}>Home Team</Table.HeaderCell>
                      <Table.HeaderCell id="headers" style={{fontSize: "20px"}}>Away Team</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {NFLgames.map((game) => (
                      <Table.Row 
                        key={game.home_team + game.teams[0] + game.teams[1]}
                      >

                        <Table.Cell style={{backgroundColor:"grey"}}>
                          <Button
                            as="div"
                            labelPosition="right"
                            name={game.teams[0] + " vs " + game.teams[1]}
                            value={[
                              game.teams[0] + " vs " + game.teams[1],
                              game.teams[0],
                              game.sites[0].odds.spreads.points[0],
                            ]}
                            onClick={handleChange}
                          >
                            <Button style={{color:footballColor(game.teams[0]).primary, backgroundColor:footballColor(game.teams[0]).secondary }}icon>{game.teams[0]}</Button>
                            <Label style={{color:footballColor(game.teams[0]).secondary,  backgroundColor:footballColor(game.teams[0]).primary}} basic pointing="left">
                              {game.sites[0].odds.spreads.points[0]}
                            </Label>
                          </Button>
                        </Table.Cell>
                        <Table.Cell style={{backgroundColor:"grey"}}>
                          <Button
                            as="div"
                            labelPosition="right"
                            name={game.teams[0] + " vs " + game.teams[1]}
                            value={[
                              game.teams[0] + " vs " + game.teams[1],
                              game.teams[1],
                              game.sites[0].odds.spreads.points[1],
                            ]}
                            onClick={handleChange}
                          >
                            <Button style={{color:footballColor(game.teams[1]).primary, backgroundColor:footballColor(game.teams[1]).secondary}}icon>{game.teams[1]}</Button>
                            <Label style={{color:footballColor(game.teams[1]).secondary, backgroundColor:footballColor(game.teams[1]).primary}}basic pointing="left">
                              {game.sites[0].odds.spreads.points[1]}
                            </Label>
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Column>

              {pickEm.length > 0 ? (
                <Grid.Column>
                  <Card style={{backgroundColor: "white"}}>
                    <Card.Header id="headers" style={{fontSize: "24px"}}>Sports Ticket</Card.Header>
                    <Card.Content style={{backgroundColor: "#002244"}}>
                      <Card.Group>
                        <Table style={{backgroundColor: "grey" }}>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                {pickEm.map((pick) => (
                                  <Card 
                                    fluid
                                    color="red"
                                    key={pick[0] + pick[1] + pick[2]}
                                  >
                                    <p>Game: {pick[0]}</p>
                                    <p>Pick: {pick[1]}</p>
                                    <p>Spread: {pick[2]}</p>
                                  </Card>
                                ))}
                                <Button fluid onClick={() => setPickEm([])}>
                                  Clear Bet
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <SearchForm
                                  handleInputChange={handleInputChange}
                                  users={users}
                                  search={search}
                                />
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  onChange={handleInputBet}
                                  labelPosition="right"
                                  type="text"
                                  placeholder="Amount"
                                >
                                  <Label basic>$</Label>
                                  <input />
                                  <Label>.00</Label>
                                </Input>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <Button positive onClick={handleSubmit}>
                                  Submit Wager Request
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Card.Group>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ) : (
                <p></p>
              )}
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
        </>)}
      </Modal>
    </>
  );
};

export default Bet;
