import express from 'express';
import office from '../controller/office';
import isAdmin from '../middlewares/isAdmin';
import isLoggedIn from '../middlewares/isLoggedIn';
import { checkOfficeData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isAdmin, checkOfficeData, office.createOffice);
Router.post('/:id/register', isAdmin, office.register);
Router.post('/:id/result', office.getResult);
Router.get('/', office.getAllOffice);
Router.get('/:id', office.getAnOffice);
Router.get('/:userId/:officeId', isLoggedIn, office.expressInterest);

export default Router;
