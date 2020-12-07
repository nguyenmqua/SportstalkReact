import React, {useEffect, useState} from "react"
import API from "../../utils/API"
import Ticker from 'react-ticker'
 
 
const SportsTicker = () =>{
  const [articles, setArticles] = useState("")

  useEffect(() => {
    API.getSportsNews()
    .then(res=>{
        setArticles(res.data)})
    }, [])
  
    return articles ? (
      <p style={{ whiteSpace: "nowrap", color:"#008ae6" }}>{articles.join("++++++")}+++++++</p>
    ) : (
      <p style={{ visibility: "hidden" }}>Placeholder</p>
    );
  };

  function StockTicker() {
    return (
      <></>
      // <Ticker offset="run-in" speed={4}>
      //   {() => <SportsTicker />}
      // </Ticker>
    );
  }

export default StockTicker 


