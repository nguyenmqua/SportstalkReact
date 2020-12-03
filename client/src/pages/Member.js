import React, { useState, useEffect } from 'react';
import { Tab } from 'semantic-ui-react'
import UserPost from '../components/UserPost'
import UserBets from '../components/UserBet'
import { useParams } from "react-router-dom";
import API from '../utils/API';
import Results from '../components/Result'


const Member = () => {
    const [AllPost, setAllPost] = useState([])
    const [allBets, setAllBets] = useState([])

    const {id} = useParams()
    const panes = [
      { menuItem: 'My Posts', render: () => <Tab.Pane><UserPost AllPost={AllPost} /></Tab.Pane> },
      { menuItem: 'My Bets', render: () => <Tab.Pane><UserBets allBets={allBets}/></Tab.Pane> },
      { menuItem: 'My Results', render: () => <Tab.Pane><Results allBets={allBets}/></Tab.Pane> },
    ]

    useEffect(() => {
        API.newsfeedByID(id)
        .then(res=>{
            setAllPost(res.data)
        })
        API.getUserBet(id)
        .then(res=>{
            console.log(res.data)
            setAllBets(res.data.sportTicket)
        })      
      }, []);

    return( 

      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    
    )
 
}

export default Member