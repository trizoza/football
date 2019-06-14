const season = require('./season.json')
const teams = {}
let rankings = []

const calculateRankings = () => {
    season.rounds.forEach(round => {
        round.matches.forEach(match => {
            processMatch(match, 1) 
            processMatch(match, 2)
        })
    })
    return sortTeams(teams)
}

const processMatch = (match, pos) => {
    let teamCode = match[`team${pos}`].code
    let invertedPos = pos === 1 ? 2 : 1
    let matchDetails = {
        match, 
        teamCode, 
        pos, 
        invertedPos
    }
    !teams[teamCode] ? createTeamRecord(matchDetails) : updateTeamRecord(matchDetails)
}

const createTeamRecord = ({match, teamCode, pos, invertedPos}) => {
    let team = {
        teamName: match[`team${pos}`].name,
        wins: match[`score${pos}`] > match[`score${invertedPos}`] ? 1 : 0,
        draws: match[`score${pos}`] === match[`score${invertedPos}`] ? 1 : 0,
        losses: match[`score${pos}`] < match[`score${invertedPos}`] ? 1 : 0,
        goalsFor: match[`score${pos}`],
        goalsAgainst: match[`score${invertedPos}`],
        points: calculatePoints(match[`score${pos}`], match[`score${invertedPos}`]),
    }
    team.goalDifference = team.goalsFor - team.goalsAgainst,
    teams[teamCode] = team
}

const updateTeamRecord = ({match, teamCode, pos, invertedPos}) => {
    let team = teams[teamCode]    
    let { wins, draws, losses, goalsFor, goalsAgainst, points, teamName } = team
    wins += match[`score${pos}`] > match[`score${invertedPos}`] ? 1 : 0
    draws += match[`score${pos}`] === match[`score${invertedPos}`] ? 1 : 0
    losses += match[`score${pos}`] < match[`score${invertedPos}`] ? 1 : 0
    goalsFor += match[`score${pos}`]
    goalsAgainst += match[`score${invertedPos}`]
    points += calculatePoints(match[`score${pos}`], match[`score${invertedPos}`])
    let updatedTeam = {
        teamName,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        points,
        goalDifference: goalsFor - goalsAgainst,
    }
    teams[teamCode] = updatedTeam
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

const sortTeams = (teams) => {
    let teamsArray = Object.keys(teams).map(teamCode => teams[teamCode])
    teamsArray.sort((team1, team2) => {
        // sort by points
        if (team1.points > team2.points) return -1;
        if (team1.points < team2.points) return 1;
        // sort by goalDifference
        if (team1.goalDifference > team2.goalDifference) return -1;
        if (team1.goalDifference < team2.goalDifference) return 1;
        // sort by goalsFor
        if (team1.goalsFor > team2.goalsFor) return -1;
        if (team1.goalsFor < team2.goalsFor) return 1;
    })
    // assign ranks
    return teamsArray.map((team, index) => {
        team.rank = index + 1
        return team
    })
}

rankings = calculateRankings()

console.log('rankings ', rankings)
