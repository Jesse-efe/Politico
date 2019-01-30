import data from '../models/storage';

class Party {
  static async getAllParty(req, res) {
    let parties = data[0];
    let formattedParties = [];
    await parties.forEach((party) => {
        let oneParty = {
            id: party.id,
            name: party.name,
            logoUrl: party.logoUrl,
        }
        formattedParties.push(oneParty);
    })
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

    let id = data[0].length + 100;
    let newParty = {
      id,
      name,
      hqAddress,
      logoUrl,
    }
    data[0].push(newParty);
    let response = {
      status : 201,
      data : [ {
      id,
      name,
      } ]
    };

    return res.status(201).json(response);
  }

  static async getOneParty(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id'
      });
    }
    let parties = data[0];
    let foundParty = false;
    await parties.forEach((party) => {
      if(party.id === id){
        foundParty = true;
        let oneParty = {
          id: party.id,
          name: party.name,
          logoUrl: party.logoUrl,
        }
        let response = {
          status: 200 ,
          data: [oneParty],
        }
        return res.status(200).json(response);
      }
    });
    if(!foundParty){
      return res.status(404).json({
        status: 404,
        error: 'That party could not be found'
      });
    } 
  }

  static async editParty(req, res) {
    const { id } = req.params;
    const {
      name,
    } = req.body;
    
    let parties = data[0];
    let foundParty = false;
    await parties.forEach((party) => {
      if(party.id === id){
        foundParty = true;
        party.name = name;
        let oneParty = {
          id: party.id,
          name: party.name,
        }
        let response = {
          status: 200 ,
          data: [oneParty],
        }
        return res.status(200).json(response);
      }
    });
    if(!foundParty){
      return res.status(404).json({
        status: 404,
        error: 'That party could not be found'
      });
    }
  }

  static async deleteParty(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid party Id'
      });
    }
    let parties = data[0];
    let foundParty = false;
    let partyIndex;
    await parties.forEach((party) => {
      if(party.id === id){
        foundParty = true;
        partyIndex = party.id - 100;
      }
    });
    if(foundParty){
      parties.splice(partyIndex, 1);
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'Party deleted sucessfully',
        }]
      });
    } else {
      return res.status(404).json({
        status: 404,
        error: 'That party could not be found'
      });
    }
  }

}

export default Party;