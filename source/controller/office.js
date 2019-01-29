import data from '../db/storage';

class Office {
  static async createOffice(req, res) {
    const {
      name, type,
    } = req.body;

    let id = data[1].length + 100;
    let newOffice = {
      id,
      name,
      type,
    }
    data[1].push(newOffice);
    let response = {
      status : 201,
      data : [ {
      id,
      type,
      name,
    } ]
    };

    return res.status(201).json(response);
  }
}

export default Office;