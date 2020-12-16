const axios = require('axios')

// const api_key = process.argv[2] || '095b2dca8cd6fa9a17b303b8694d3362' (Janeth)
// const api_key = process.argv[2] || '23117c580c41f8c13a4ba8b100f9ee7e' 
// const api_key = process.argv[2] || '73a6013b3823076c32114f2566a39e6d'
const api_key = process.argv[2] || '2480ba5ee8cceae8b8c0cc26edcaadda'



const sport_key = 'americanfootball_nfl' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

const region = 'us' // uk | us | eu | au

const market = 'spreads' // h2h | spreads | totals

https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4391



module.exports = {
    
    get: function(req,res){

        axios.get('https://api.the-odds-api.com/v3/odds', {
            params: {
            api_key: api_key,
            sport: sport_key,
            region: region,
            mkt: market,
                }
            })
        .then(response => {
            res.json(response.data.data);
   
        })
        .catch(error => {
            console.log('Error status SportsOdd', error.response.status)
            console.log(error.response.data)
        })
    },

    getSportsNews: function(req,res){

        const url = 'http://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=59e2e205566e4349987668614c1b4ae6';
        axios.get(url)
        .then(function(response) {
            const SportsNews = []
            for (i =0; i <10; i++){
               SportsNews.push(response.data.articles[i].title)
            }
            res.json(SportsNews);
        })
        .catch(error => {
            console.log('Error status', error.response.status)
            console.log(error.response.data)
        })
    }
    
}