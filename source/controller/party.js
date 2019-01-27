import data from '../db/storage';

class Party {
  static getAllParty(req, res) {
    let parties = data[0];
    let formattedParties = [];
    parties.forEach((party) => {
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
  }

  export default Party;