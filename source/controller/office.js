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
    id = parseInt(id, 10);
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

  static async expressInterest(req, res) {
    let { userId, officeId } = req.params;
    const authorizedId = req.userData.id;
    userId = parseInt(userId, 10);
    officeId = parseInt(officeId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid user Id',
      });
    }
    if (isNaN(officeId)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid office Id',
      });
    }
    if (authorizedId !== userId) {
      return res.status(400).json({
        status: 400,
        error: 'Auth failed',
      });
    }

    let query = {
      text: 'SELECT * FROM interestedUsers WHERE candidate = $1',
      values: [userId],
    };
    try {
      let result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'You have already expressed interest to run for an office',
        });
      }

      const userPartyId = await Office.isPolitician(userId);
      if (!userPartyId) {
        return res.status(400).json({
          status: 400,
          error: 'You are not a member of any political party, please join one first',
        });
      }
      // query = {
      //   text: 'SELECT * FROM partyMembers WHERE userId = $1',
      //   values: [userId],
      // };
      // result = await pool.query(query);
      // if (result.rowCount !== 1) {
      //   return res.status(400).json({
      //     status: 400,
      //     error: 'You are not a member of any political party, please join one first',
      //   });
      // }
      // const userPartyId = result.rows[0].partyid;
      query = {
        text: 'SELECT * FROM offices WHERE id = $1',
        values: [officeId],
      };
      result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(400).json({
          status: 400,
          error: 'that office does not exist',
        });
      }

      query = {
        text: 'INSERT INTO interestedUsers (office, candidate, party) VALUES ($1, $2, $3)',
        values: [officeId, userId, userPartyId],
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

  static async isPolitician(userId) {
    const query = {
      text: 'SELECT * FROM partyMembers WHERE userId = $1',
      values: [userId],
    };
    const result = await pool.query(query);
    if (result.rowCount !== 1) {
      return false;
    }
    const userPartyId = result.rows[0].partyid;
    return userPartyId;
  }

  static async register(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid user Id',
      });
    }

    let query = {
      text: 'SELECT * FROM interestedUsers WHERE candidate = $1',
      values: [id],
    };
    try {
      let result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(400).json({
          status: 400,
          error: 'This user is not interested in running for an office',
        });
      }
      const officeId = result.rows[0].office;
      const partyId = result.rows[0].party;

      query = {
        text: 'SELECT * FROM candidates WHERE candidate = $1',
        values: [id],
      };
      result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'this candidate is already registered',
        });
      }

      query = {
        text: 'SELECT * FROM candidates WHERE office = $1 AND party = $2',
        values: [officeId, partyId],
      };
      result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'this party already has a registered candidate for this office',
        });
      }

      query = {
        text: 'INSERT INTO candidates (office, party, candidate) VALUES ($1, $2, $3)',
        values: [officeId, partyId, id],
      };
      await pool.query(query);

      query = {
        text: 'DELETE FROM interestedUsers WHERE candidate = $1',
        values: [id],
      };
      await pool.query(query);
      const response = {
        status: 201,
        data: [{
          office: officeId,
          user: id,
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

  static async getOfficeInterestedCandidates(req, res) {
    const table = 'interestedUsers';
    Office.getOfficeCandidates(req, res, table);
  }

  static async getOfficeRegisteredCandidates(req, res) {
    const table = 'candidates';
    Office.getOfficeCandidates(req, res, table);
  }

  static async getOfficeCandidates(req, res, table) {
    let { id } = req.params;
    id = parseInt(id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid office Id',
      });
    }

    const text = `SELECT u.id, u.firstname, u.lastname, u.othername, p.abbreviation FROM ${table} c INNER JOIN users u ON c.candidate = u.id INNER JOIN parties p ON c.party = p.id WHERE office = $1`;
    const query = {
      text,
      values: [id],
    };

    try {
      const result = await pool.query(query);
      if (result.rowCount === 0) {
        return res.status(200).json({
          status: 200,
          data: [],
        });
      }
      const candidates = result.rows;
      const response = {
        status: 200,
        data: candidates,
      };
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        error: 'there was an error...please try later',
      });
    }
  }

  static async getResult(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid office Id',
      });
    }

    let query = {
      text: 'SELECT * FROM offices WHERE id = $1',
      values: [id],
    };
    try {
      let result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({
          status: 404,
          error: 'That office could not be found',
        });
      }

      query = {
        text: 'SELECT v.candidate, u.firstname, u.lastname, u.othername, p.abbreviation, COUNT(v.candidate) FROM votes v INNER JOIN users u ON v.candidate = u.id INNER JOIN parties p ON v.party = p.id WHERE office = $1 GROUP BY v.candidate, u.firstname, u.lastname, u.othername, p.abbreviation ORDER BY count DESC',
        values: [id],
      };
      result = await pool.query(query);
      const candidatesCount = result.rows;
      const electionResult = [];
      for (let i = 0; i < candidatesCount.length; i++) {
        const oneResult = {
          office: id,
          candidate: candidatesCount[i].candidate,
          name: `${candidatesCount[i].firstname} ${candidatesCount[i].lastname} ${candidatesCount[i].othername}`,
          party: candidatesCount[i].abbreviation,
          result: Number(candidatesCount[i].count),
        };
        electionResult.push(oneResult);
      }
      const response = {
        status: 200,
        data: electionResult,
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
