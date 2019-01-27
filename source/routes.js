import express from 'express';
import party from './controller/party';
import { checkPartyData } from './helpers/validations';

const Router = express.Router();

Router.post('/parties', checkPartyData, party.createParty);


export default Router;
