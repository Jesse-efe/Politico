import express from 'express';
import office from '../controller/office';
import isAdmin from '../middlewares/isAdmin';
import { checkOfficeData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isAdmin, checkOfficeData, office.createOffice);
Router.get('/', office.getAllOffice);
Router.get('/:id', office.getAnOffice);

export default Router;
