// import data from '../models/storage';
import pool from '../models/config';

class Office {
  static async createOffice(req, res) {
    const {
      name, type,
    } = req.body;

    let query = {
      text: 'SELECT * FROM offices WHERE name = $1',
      values: [name],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'An office with this name already exist',
        });
      }
      query = {
        text: 'INSERT INTO offices (name, type) VALUES ($1, $2) RETURNING id',
        values: [name, type],
      };
      const insertId = await pool.query(query);
      const response = {
        status: 201,
        data: [{
          id: insertId.rows[0].id,
          type,
          name,
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

  static getAllOffice(req, res) {
    pool.query('SELECT * FROM offices', (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'there was an error...please try later',
        });
      }
      const offices = result.rows;
      const response = {
        status: 200,
        data: offices,
      };
      return res.status(200).json(response);
    });
  }

  static async getAnOffice(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid office Id',
      });
    }

    const query = {
      text: 'SELECT * FROM offices WHERE id = $1',
      values: [id],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That office could not be found',
        });
      }
      const office = result.rows[0];
      const response = {
        status: 200,
        data: [office],
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }
}

export default Office;
