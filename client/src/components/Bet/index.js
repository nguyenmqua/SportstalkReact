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
} from "semantic-ui-react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
];

const Bet = () => {
  const { user } = useContext(UserContext);
  const [Open, setOpen] = useState(false);
  const [NFLgames, setNFLgames] = useState([]);
  const [pickEm, setPickEm] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [wager, setWager] = useState({});

  useEffect(() => {
    // loadNFL();
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
    API.getNFL().then((res) => {
      console.log(res.data);
      setNFLgames(res.data);
    });
  };

  const loadUsers = () => {
    API.getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // const handleInputClick= (event) => {
  //     console.log(search.length)
  //     if (search.length >0){
  //     API.getUser(search)
  //     .then(res=>{
  //         console.log(res.data[0]._id)
  //         setCompetitor(res.data[0]._id)})
  //     }
  // }

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
          <Button
            style={{
              backgroundColor: "#008ae6",
              color: "white",
              marginTop: "5px",
              borderStyle: "outset",
            }}
          >
            Bet a buddy
          </Button>
        }
      >
        <Modal.Header>Betting Odds</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Grid stackable columns={2} padded="vertically">
              <Grid.Column>
                <Table celled compact definition>
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell>Home Team</Table.HeaderCell>
                      <Table.HeaderCell>Away Team</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {NFLgames.map((game) => (
                      <Table.Row 
                        key={game.home_team + game.teams[0] + game.teams[1]}
                      >

                        <Table.Cell>
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
                            <Button icon>{game.teams[0]}</Button>
                            <Label basic pointing="left">
                              {game.sites[0].odds.spreads.points[0]}
                            </Label>
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
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
                            <Button icon>{game.teams[1]}</Button>
                            <Label basic pointing="left">
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
                  <Card>
                    <Card.Header>Sports Ticket</Card.Header>
                    <Card.Content>
                      <Card.Group>
                        <Table>
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
      </Modal>
    </>
  );
};

export default Bet;
