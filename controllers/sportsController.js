const axios = require('axios')

const api_key = process.argv[2] || '2480ba5ee8cceae8b8c0cc26edcaadda'

const sport_key = 'americanfootball_nfl' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

const region = 'us' // uk | us | eu | au

const market = 'spreads' // h2h | spreads | totals



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
            // response.data.data contains a list of live and 
            //   upcoming events and odds for different bookmakers.
            // Events are ordered by start time (live events are first)
            // console.log(JSON.stringify(response.data.data))
            // console.log('Remaining requests',response.headers['x-requests-remaining'])
            // console.log('Used requests',response.headers['x-requests-used'])

        })
        .catch(error => {
            console.log('Error status', error.response.status)
            console.log(error.response.data)
        })

      
        }
    }