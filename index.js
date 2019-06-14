const season = require('./season.json')

// console.log('season ', season)

const teams = {}

const run = () => {
    season.rounds.forEach(round => {
        // console.log('round ', round)
        round.matches.forEach(match => {
            // console.log('match ', match)
            // console.log('teams ', teams)
            Object.keys(teams).indexOf(match.team1.code) === -1 ? firstMatch(match, 1) : otherMatch(match, 1)
            Object.keys(teams).indexOf(match.team2.code) === -1 ? firstMatch(match, 2) : otherMatch(match, 2)
        })
    })

    const rankings = sortTeams(teams)

    console.log('rankings ', rankings)
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

const otherMatch = (match, pos) => {
    let teamCode = match[`team${pos}`].code
    let invertedPos = pos === 1 ? 2 : 1
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
    // console.log('team before update ', team)
    // console.log('match ', match)
    // console.log('team after update ', updatedTeam)
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
    console.log('teamsArray ', teamsArray)
    teamsArray.sort((team1, team2) => {

        if (team1.points > team2.points) return -1;
        if (team1.points < team2.points) return 1;
    
        if (team1.goalDifference > team2.goalDifference) return -1;
        if (team1.goalDifference < team2.goalDifference) return 1;
        
        if (team1.goalsFor > team2.goalsFor) return -1;
        if (team1.goalsFor < team2.goalsFor) return 1;
    })

    console.log('teamsArray sorted ', teamsArray);

    return teamsArray.map((team, index) => {
        team.rank = index + 1
        return team
    })
}


run()
