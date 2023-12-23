const db = require('../db')

class UserScoreController{
    async createUserScore(req, res) {
        try {
          const { name, telegram, score } = req.body;
    
          if (!name || !telegram) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
    
          const newUserScore = await db.query(
            'INSERT INTO score (name, telegram, score) VALUES ($1, $2, $3) RETURNING *',
            [name, telegram, score || 0]
          );
    
          res.json(newUserScore.rows[0]);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
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

    async updateUserScore(req, res) {
        try {
          const { name, telegram, score } = req.body;
    
          if (!name || !telegram) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
    
          const existingUser = await db.query('SELECT * FROM score WHERE name = $1 AND telegram = $2', [name, telegram]);
    
          if (!existingUser.rows.length) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          const currentScore = existingUser.rows[0].score;
    
          if (score > currentScore) {
            const updatedUserScore = await db.query(
              'UPDATE score SET score = $1 WHERE name = $2 AND telegram = $3 RETURNING *',
              [score, name, telegram]
            );
    
            return res.json(updatedUserScore.rows[0]);
          } else {
            return res.json(existingUser.rows[0]);
          }
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    async deleteUserScore(req, res){
        const id  = req.params.id
        const userScore = await db.query('DELETE from score where id = $1', [id]) 

        res.json(userScore.rows[0]) 
    }
}

module.exports = new UserScoreController()