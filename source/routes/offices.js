import express from 'express';
import office from '../controller/office';
import isAdmin from '../middlewares/isAdmin';
import isLoggedIn from '../middlewares/isLoggedIn';
import { checkOfficeData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isAdmin, checkOfficeData, office.createOffice);
Router.get('/', office.getAllOffice);
Router.post('/:id/register', isAdmin, office.register);
Router.get('/:id', office.getAnOffice);
Router.get('/:userId/:officeId', isLoggedIn, office.expressInterest);

export default Router;
