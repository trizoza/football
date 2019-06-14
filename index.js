const season = require('./season.json')

console.log('season ', season)

const ranking = []

season.rounds.forEach(round => {
    // console.log('round ', round)
    round.matches.forEach(match => {
        console.log('match ', match)
    })
})
