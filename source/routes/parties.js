import express from 'express';
import party from '../controller/party';
import { checkPartyData, checkEditPartyData} from '../middlewares/validations';

const Router = express.Router();

Router.post('/', checkPartyData, party.createParty);
Router.get('/', party.getAllParty);
Router.get('/:id', party.getOneParty);
Router.patch('/:id/name', checkEditPartyData, party.editParty);
Router.delete('/:id', party.deleteParty);

export default Router;