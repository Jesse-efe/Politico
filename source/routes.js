import express from 'express';
import party from './controller/party';
import { checkPartyData } from './helpers/validations';

const Router = express.Router();

Router.post('/parties', checkPartyData, party.createParty);
Router.get('/parties', party.getAllParty);
Router.get('/parties/:id', party.getOneParty);


export default Router;
