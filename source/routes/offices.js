import express from 'express';
import office from '../controller/office';
import { checkOfficeData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', checkOfficeData, office.createOffice);
Router.get('/', office.getAllOffice);
Router.get('/:id', office.getAnOffice);

export default Router;