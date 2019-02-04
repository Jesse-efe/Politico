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
          error: 'a user with this email already exists',
        });
      }
      const hashPaswd = await bcrypt.hash(password, 5);
      query = {
        text: 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [firstname, lastname, othername, email, phoneNumber, passportUrl, hashPaswd],
      };
      const insertId = await pool.query(query);
      const secretKey = process.env.userSecretKey;
      const { id } = insertId.rows[0];
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

  static async logUserIn(req, res) {
    const { email, password } = req.body;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(401).json({
          status: 401,
          error: 'Auth failed',
        });
      }
      const isCorrectPwd = await bcrypt.compare(password, result.rows[0].password);
      let secretKey;
      if (!isCorrectPwd) {
        return res.status(401).json({
          status: 401,
          error: 'Auth failed',
        });
      }
      if (result.rows[0].isadmin) {
        secretKey = process.env.adminSecretKey;
      } else {
        secretKey = process.env.userSecretKey;
      }
      const { id } = result.rows[0];
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
            id: result.rows[0].id,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
            othername: result.rows[0].othername,
            email: result.rows[0].email,
            phoneNumber: result.rows[0].phonenumber,
            passportUrl: result.rows[0].passporturl,
            isAdmin: result.rows[0].isadmin,
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
