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



const Bet = () => {
  const { user, footballColor } = useContext(UserContext);
  const [Open, setOpen] = useState(false);
  const [NFLgames, setNFLgames] = useState([]);
  const [pickEm, setPickEm] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [wager, setWager] = useState({});

  useEffect(() => {
    loadNFL();
    loadUsers();
  }, []);

  

  // const footballColor = (team) =>{
  //   switch(team) {
  //     case "Arizona Cardinals":
  //       return {primary: "#97233F", secondary: "#000000"}
  //     case "Atlanta Falcons":
  //       return {primary: "#A71930", secondary: "#000000"}
  //     case "Baltimore Ravens":
  //       return {primary:"#241773", secondary:"#000000"}
  //     case "Buffalo Bills":
  //       return {primary:"#00338D", secondary:"#C60C30"}
  //     case "Carolina Panthers":
  //       return {primary:"#0085CA", secondary:"#000000"}
  //     case "Chicago Bears":
  //       return {primary:"#C83803", secondary:"#0B162A"}
  //     case "Cincinnati Bengals":
  //       return {primary:"#FB4F14", secondary:"#000000"} 
  //     case "Cleveland Browns":
  //       return {primary:"#311D00", secondary:"#FF3C00"}
  //     case "Dallas Cowboys":
  //       return {primary:"#003594", secondary:"#869397"}
  //     case "Denver Broncos":
  //       return {primary:"#FB4F14", secondary:"#002244"}
  //     case "Detriot Lions":
  //         return {primary:"#0076B6", secondary:"#B0B7BC"}
  //     case "Green Bay Packers":
  //         return {primary:"#FFB612", secondary:"#203731"}
  //     case "Houston Texans":
  //         return {primary:"#03202F", secondary:"#A71930"}
  //     case "Indianapolis Colts":
  //         return {primary:"#002C5F", secondary:"#A2AAAD"}
  //     case "Jacksonville Jaguars":
  //         return {primary:"#101820", secondary:"#D7A22A"}
  //     case "Kansas City Chiefs":
  //         return {primary:"#E31837", secondary:"#FFB81C"}
  //     case "Los Angeles Chargers":
  //         return {primary:"#D7A22A", secondary:"#000000"}
  //     case "Los Angeles Rams":
  //         return {primary:"#003594", secondary:"#FFA300"}
  //     case "Miami Dolphins":
  //         return {primary:"#008E97", secondary:"#FC4C02"}
  //     case "Minnesota Vikings":
  //         return {primary:"#4F2683", secondary:"#FFC62F"}
  //     case "New England Patriots":
  //         return {primary:"#002244", secondary:"#C60C30"}
  //     case "New Orleans Saints":
  //         return {primary:"#D3BC8D", secondary:"#101820"}
  //     case "New York Giants":
  //         return {primary:"#0B2265", secondary:"#A71930"}
  //     case "New York Jets":
  //         return {primary:"#125740", secondary:"#000000"}
  //     case "Las Vegas Raiders":
  //         return {primary:"#000000", secondary:"#A5ACAF"}
  //     case "Philadelphia Eagles":
  //         return {primary:"#004C54", secondary:"#A5ACAF"}
  //     case "Pittsburgh Steelers":
  //         return {primary:"#FFB612", secondary:"#0000000"}
  //     case "San Francisco 49ers":
  //         return {primary:"#AA0000", secondary:"#B3995D"}
  //     case "Seattle Seahawks":
  //         return {primary:"#69BE28", secondary:"#002244"}
  //     case "Tampa Bay Buccaneers":
  //         return {primary:"#D50A0A", secondary:"#FF7900"}
  //     case "Tennessee Titans":
  //         return {primary:"#0C2340", secondary:"#4B92DB"}
  //     case "Washington Redskins":
  //         return {primary:"#773141;", secondary:"#FFB612"}
  //       break;
  //     default:
  //       return {primary: "blue"}
  //   }
  // }
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
          <Button id="headers" color="blue" style={{fontSize: "24px", color:"#000000"}}>Bet-a-Buddy</Button>
        }
      >
        <Modal.Header id="headers" style={{fontSize: "50px"}}>Betting Odds</Modal.Header>
        <Modal.Content  style={{backgroundColor: "#002244" }} scrolling>
          <Modal.Description>
            <Grid stackable columns={2} padded="vertically">
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
      </Modal>
    </>
  );
};

export default Bet;
