import express from 'express';
import party from '../controller/party';
import { isAdmin, isLoggedIn } from '../middlewares/secureRoutes';
import { checkPartyData, checkEditPartyData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isAdmin, checkPartyData, party.createParty);
Router.get('/', party.getAllParty);
Router.get('/:partyId/join', isLoggedIn, party.joinParty);
Router.get('/:id', party.getOneParty);
Router.patch('/:id/name', isAdmin, checkEditPartyData, party.editParty);
Router.delete('/:id', isAdmin, party.deleteParty);

export default Router;
