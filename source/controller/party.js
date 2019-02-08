import pool from '../models/config';

class Party {
  static getAllParty(req, res) {
    pool.query('SELECT * FROM parties', (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'there was an error...please try later',
        });
      }
      const parties = result.rows;
      const formattedParties = [];
      for (let i = 0; i < parties.length; i++) {
        const oneParty = {
          id: parties[i].id,
          name: parties[i].name,
          logoUrl: parties[i].logo,
        };
        formattedParties.push(oneParty);
      }
      const response = {
        status: 200,
        data: formattedParties,
      };
      return res.status(200).json(response);
    });
  }

  static async createParty(req, res) {
    const {
      name, logoUrl, hqAddress,
    } = req.body;

    let query = {
      text: 'SELECT * FROM parties WHERE name = $1',
      values: [name],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'A party with this name already exist',
        });
      }
      query = {
        text: 'INSERT INTO parties (name, logo, address) VALUES ($1, $2, $3) RETURNING id',
        values: [name, logoUrl, hqAddress],
      };
      const insertId = await pool.query(query);
      const response = {
        status: 201,
        data: [{
          id: insertId.rows[0].id,
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

  static async getOneParty(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id',
      });
    }

    const query = {
      text: 'SELECT * FROM parties WHERE id = $1',
      values: [id],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That party could not be found',
        });
      }
      const party = result.rows[0];
      const oneParty = {
        id: party.id,
        name: party.name,
        logoUrl: party.logo,
      };
      const response = {
        status: 200,
        data: [oneParty],
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }

  static async editParty(req, res) {
    const { id } = req.params;
    const {
      name,
    } = req.body;

    let query = {
      text: 'SELECT * FROM parties WHERE id = $1',
      values: [id],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That party could not be found',
        });
      }
      query = {
        text: 'UPDATE parties SET name = $1 WHERE id = $2',
        values: [name, id],
      };
      await pool.query(query);
      const oneParty = {
        id,
        name,
      };
      const response = {
        status: 200,
        data: [oneParty],
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }

  static async deleteParty(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id',
      });
    }

    let query = {
      text: 'SELECT * FROM parties WHERE id = $1',
      values: [id],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That party could not be found',
        });
      }
      query = {
        text: 'DELETE FROM parties WHERE id = $1',
        values: [id],
      };
      await pool.query(query);
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'Party deleted sucessfully',
        }],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }

  static async joinParty(req, res) {
    const userId = req.userData.id;
    let { partyId } = req.params;

    partyId = parseInt(partyId, 10);
    if (isNaN(partyId)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id',
      });
    }
    let query = {
      text: 'SELECT * FROM parties WHERE id = $1',
      values: [partyId],
    };
    try {
      let result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That party could not be found',
        });
      }
      query = {
        text: 'SELECT * FROM partyMembers WHERE userId = $1',
        values: [userId],
      };
      result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'you are already a member of a party',
        });
      }
      query = {
        text: 'INSERT INTO partyMembers (partyId, userId) VALUES ($1, $2)',
        values: [partyId, userId],
      };
      await pool.query(query);
      const response = {
        status: 200,
        data: [{
          message: 'successful',
        }],
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

export default Party;
