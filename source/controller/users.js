import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/config';

class Users {
  static async signUserUp(req, res) {
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl, password,
    } = req.body;
    let query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    try {
      const result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'You are already a rigistered user please signin',
        });
      }
      const hashPaswd = await bcrypt.hash(password, 5);
      query = {
        text: 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [firstname, lastname, othername, email, phoneNumber, passportUrl, hashPaswd],
      };
      const insertId = await pool.query(query);
      const secretKey = process.env.userSecretKey;
      const id = insertId.rows[0].id;
      const token = jwt.sign(
        {
          email,
          id,
        }, secretKey, { expiresIn: 60 * 60 },
      );
      const response = {
        status: 201,
        data: [{
          token,
          user: {
            id, firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin: 'false',
          },
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

export default Users;
