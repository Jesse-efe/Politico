import express from 'express';
import party from './controller/party';
import office from './controller/office';
import { checkPartyData, checkEditPartyData, checkOfficeData } from './helpers/validations';

const Router = express.Router();

Router.post('/parties', checkPartyData, party.createParty);
Router.get('/parties', party.getAllParty);
Router.get('/parties/:id', party.getOneParty);
Router.patch('/parties/:id/name', checkEditPartyData, party.editParty);
Router.delete('/parties/:id', party.deleteParty);
Router.post('/offices', checkOfficeData, office.createOffice);
Router.get('/offices', office.getAllOffice);

export default Router;
