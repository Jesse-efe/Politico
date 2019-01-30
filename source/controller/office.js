import data from '../models/storage';

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

  static async getAllOffice(req, res) {
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
    let foundOffice = false;
    await offices.forEach((office) => {
      if(office.id === id){
        foundOffice = true;
        let response = {
          status: 200 ,
          data: [office],
        }
        return res.status(200).json(response);
      }
    });
    if(!foundOffice){
      return res.status(404).json({
        status: 404,
        error: 'That office could not be found'
      });
    } 
  }
}

export default Office;