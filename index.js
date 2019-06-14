const season = require('./season.json')

console.log('season ', season)

const played = []
const rankings = []
const teams = {}

const run = () => {
    season.rounds.forEach(round => {
        // console.log('round ', round)
        round.matches.forEach(match => {
            // console.log('match ', match)
            // console.log('teams ', teams)
            Object.keys(teams).indexOf(match.team1.code) === -1 ? firstMatch(match, 1) : console.log('other match')
            Object.keys(teams).indexOf(match.team2.code) === -1 ? firstMatch(match, 2) : console.log('other match')
        })
    })
}

const firstMatch = (match, pos) => {
    
    let teamCode = match[`team${pos}`].code
    
    console.log('teamCode ', teamCode)
    
    let invertedPos = pos === 1 ? 2 : 1

    team = {
        teamName: match[`team${pos}`].name,
        wins: match[`score${pos}`] > match[`score${invertedPos}`] ? 1 : 0,
        draws: match[`score${pos}`] === match[`score${invertedPos}`] ? 1 : 0,
        losses: match[`score${pos}`] < match[`score${invertedPos}`] ? 1 : 0,
        goalsFor: match[`score${pos}`],
        goalsAgainst: match[`score${invertedPos}`],
        points: calculatePoints(match[`score${pos}`], match[`score${invertedPos}`]),
    }
    
    // rank: "",   // udpateRank()
    team.goalDifference = team.goalsFor - team.goalsAgainst,
    teams[teamCode] = team
    // console.log('teams ', teams)
    // console.log('teams ', Object.keys(teams).length)
}

const calculatePoints = (score1, score2) => {
    if ( score1 > score2 ) {
        return 3
    } else if ( score1 < score2 ) {
        return 0
    } else {
        return 1
    }
}


run()

console.log('rankings ', rankings);
