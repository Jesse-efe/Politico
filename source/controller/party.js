import data from '../models/storage';

class Party {
  static getAllParty(req, res) {
    let parties = data[0];
    let formattedParties = [];
    for(let i = 0; i < parties.length; i++){
      let oneParty = {
        id: parties[i].id,
        name: parties[i].name,
        logoUrl: parties[i].logoUrl,
      }
      formattedParties.push(oneParty);
    }
    let response = {
        status: 200 ,
        data: formattedParties,
    }
    return res.status(200).json(response);
  }

  static createParty(req, res) {
    const {
      name, logoUrl, hqAddress
    } = req.body;

    let parties = data[0];
    let id = parties.length + 100;
    for(let i = 0; i < parties.length; i++){
      if(parties[i].name === name){
        return res.status(400).json({
          status: 400,
          error: 'A party with this name already exist'
        });
      }
    }
    let newParty = {
      id,
      name,
      hqAddress,
      logoUrl,
    }
    parties.push(newParty);
    let response = {
      status : 201,
      data : [ {
      id,
      name,
      } ]
    };
    return res.status(201).json(response);
  }

  static getOneParty(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id'
      });
    }
    let parties = data[0];
    for(let i = 0; i < parties.length; i++){
      if(parties[i].id === id){
        let oneParty = {
          id: parties[i].id,
          name: parties[i].name,
          logoUrl: parties[i].logoUrl,
        }
        let response = {
          status: 200 ,
          data: [oneParty],
        }
        return res.status(200).json(response);
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'That party could not be found'
    }); 
  }

  static editParty(req, res) {
    const { id } = req.params;
    const {
      name,
    } = req.body;
    
    let parties = data[0];
    for(let i = 0; i < parties.length; i++){
      if(parties[i].id === id){
        parties[i].name = name;
        let oneParty = {
          id: parties[i].id,
          name: parties[i].name,
        }
        let response = {
          status: 200 ,
          data: [oneParty],
        }
        return res.status(200).json(response);
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'That party could not be found'
    });
  }

  static deleteParty(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id'
      });
    }
    let parties = data[0];
    for(let i = 0; i < parties.length; i++){
      if(parties[i].id === id){
        parties.splice(id, 1);
        return res.status(200).json({
          status: 200,
          data: [{
            message: 'Party deleted sucessfully',
          }]
        });
      }
    } 
    return res.status(404).json({
      status: 404,
      error: 'That party could not be found'
    });
  }

}

export default Party;