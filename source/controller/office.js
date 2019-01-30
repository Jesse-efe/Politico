import data from '../models/storage';

class Office {
  static createOffice(req, res) {
    const {
      name, type,
    } = req.body;

    let offices = data[1];
    let id = offices.length + 100;
    let foundOffice = false;
    for(let i = 0; i < offices.length; i++){
      if(offices[i].name === name){
        return res.status(400).json({
          status: 400,
          error: 'An office with this name already exist'
        });
      }
    }
    let newOffice = {
      id,
      name,
      type,
    }
    offices.push(newOffice);
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

  static getAllOffice(req, res) {
    let offices = data[1];
    let response = {
        status: 200 ,
        data: offices,
    }
    return res.status(200).json(response);
  }

  static async getAnOffice(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid office Id'
      });
    }
    let offices = data[1];
    for(let i = 0; i < offices.length; i++){
      if(offices[i].id === id){
        let response = {
          status: 200 ,
          data: [offices[i]],
        }
        return res.status(200).json(response);
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'That office could not be found'
    });
  }
}

export default Office;