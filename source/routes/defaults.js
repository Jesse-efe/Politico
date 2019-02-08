import express from 'express';
import defaults from '../controller/defaults';

const Router = express.Router();

Router.get('/', defaults.homeResponse);

export default Router;
