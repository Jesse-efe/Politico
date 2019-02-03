import pool from '../models/config';

class Vote {
  static async postVote(req, res) {
    const {
      office, candidate, voter,
    } = req.body;
    let query = {
      text: 'SELECT * FROM votes WHERE office = $1 AND voter = $2',
      values: [office, voter],
    };

    try {
      let result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'you have already voted for this office',
        });
      }

      query = {
        text: 'SELECT * FROM candidates WHERE candidate = $1',
        values: [candidate],
      };
      result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(400).json({
          status: 400,
          error: 'your candidate is not a registered candidate',
        });
      }
      if (result.rows[0].office !== office) {
        return res.status(400).json({
          status: 400,
          error: 'your candidate is not running for that office',
        });
      }

      query = {
        text: 'INSERT INTO votes (office, candidate, voter) VALUES ($1, $2, $3)',
        values: [office, candidate, voter],
      };
      await pool.query(query);
      const response = {
        status: 201,
        data: [{
          office, candidate, voter,
        }],
      };
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }
}

export default Vote;
