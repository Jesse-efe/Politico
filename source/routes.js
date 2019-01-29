import express from 'express';
import party from './controller/party';
import { checkPartyData, checkEditPartyData } from './helpers/validations';

const Router = express.Router();

Router.post('/parties', checkPartyData, party.createParty);
Router.get('/parties', party.getAllParty);
Router.get('/parties/:id', party.getOneParty);
Router.patch('/parties/:id/name', checkEditPartyData, party.editParty);
Router.delete('/parties/:id', party.deleteParty);

export default Router;
