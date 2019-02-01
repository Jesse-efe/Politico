import express from 'express';
import party from '../controller/party';
import isAdmin from '../middlewares/isAdmin';
import { checkPartyData, checkEditPartyData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isAdmin, checkPartyData, party.createParty);
Router.get('/', party.getAllParty);
Router.get('/:id', party.getOneParty);
Router.patch('/:id/name', isAdmin, checkEditPartyData, party.editParty);
Router.delete('/:id', isAdmin, party.deleteParty);

export default Router;
