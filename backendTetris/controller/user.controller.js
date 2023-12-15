const db = require('../db')

class UserScoreController{
    async createUserScore(req, res){
        const {name, telegram, score} = req.body
        // console.log(name, score)

        const newUserScore = await db.query(
            'INSERT INTO score (name, telegram, score) values ($1, $2, $3) RETURNING *', 
            [name, telegram, score])
        
        res.json(newUserScore.rows[0])
    }

    async getLiderUserScore(req, res){
        const leaderboard = await db.query('select * from score order by score desc')
        
        res.json(leaderboard.rows)        
    }

    async getOneUserScore(req, res){
        const id  = req.params.id
        const userScore = await db.query('select * from score where id = $1', [id]) 

        res.json(userScore.rows[0])        
    }

    async updateUserScore(req, res){
        const {id, name, telegram, score} = req.body
        const userScore = await db.query(
            'UPDATE score set name = $2, telegram = $3, score = $4 where id = $1 RETURNING *', 
            [id, name, telegram, score])
        res.json(userScore.rows[0])  
    }

    async deleteUserScore(req, res){
        const id  = req.params.id
        const userScore = await db.query('DELETE from score where id = $1', [id]) 

        res.json(userScore.rows[0]) 
    }
}

module.exports = new UserScoreController()