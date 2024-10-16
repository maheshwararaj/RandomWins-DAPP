import giraffe from './giraffe.jpg'
import monkey from './monkey.avif'
import cat from './cat.jpeg'
import dog from './dog.jpg'

const choices = [
    {
        id:1,
        name:"monkey",
        image:monkey
    },
    {
        id:2,
        name:"giraffe",
        image:giraffe
    },
    {
        id:3,
        name:"dog",
        image:dog
    },
    {
        id:4,
        name:"cat",
        image:cat
    }
]

const previousGames = [
    {
        id : 1,
        winner : 1,
        profit : 58,
        bets:[14,3,21,40]
    },
    {
        id : 2,
        winner : 2,
        profit : 78,
        bets:[51,13,43,9]
    },
    {
        id : 3,
        winner : 1,
        profit : 46,
        bets:[19,8,78,21]
    },
    {
        id : 4,
        winner : 4,
        profit : 380,
        bets:[43,30,17,32]
    },
    {
        id : 5,
        winner : 1,
        profit : 37,
        bets:[14,3,21,40]
    },
    {
        id : 6,
        winner : 2,
        profit : 91,
        bets:[51,13,43,9]
    },
    {
        id : 7,
        winner : 1,
        profit : 62,
        bets:[19,8,78,21]
    },
    {
        id : 8,
        winner : 4,
        profit : 70,
        bets:[43,30,17,32]
    }
]
export {choices,previousGames};