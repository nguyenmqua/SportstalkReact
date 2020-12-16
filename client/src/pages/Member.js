import React, { useState, useEffect, useContext } from 'react';
import { Tab } from 'semantic-ui-react'
import UserPost from '../components/UserPost'
import UserBets from '../components/UserBet'
import { useParams } from "react-router-dom";
import API from '../utils/API';
import Results from '../components/Result'
import UserContext from "../utils/UserContext"
import Login from "../components/Login"

const Member = () => {
    const [AllPost, setAllPost] = useState([])
    const [allBets, setAllBets] = useState([])
    const [allResults,setAllResults] = useState([])
    const {user, loggedIn} = useContext(UserContext)

    const {id} = useParams()
    const panes = [
      { menuItem: 'My Posts', render: () => <Tab.Pane><UserPost AllPost={AllPost} /></Tab.Pane> },
      { menuItem: 'My Bets', render: () => <Tab.Pane><UserBets allBets={allBets}/></Tab.Pane> },
      { menuItem: 'My Results', render: () => <Tab.Pane><Results allResults={allResults}/></Tab.Pane> },
    ]

    const panes2 = [
      { menuItem: 'Posts', render: () => <Tab.Pane><UserPost AllPost={AllPost} /></Tab.Pane> },
    ]
    useEffect(() => {
        API.newsfeedByID(id)
        .then(res=>{
            setAllPost(res.data)
        })
        API.getUserBet(id)
        .then(res=>{
            setAllBets(res.data.sportTicket)
            setAllResults(res.data.sportTicket)
        })      
      }, []);

    return( 
      <>
      {loggedIn ? (
      <>
      {user && user._id === id ? (
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      ):(<Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes2} />)} 
      </>
      ) : (<Login />)}
      </>
    )
 
}

export default Member