import express from 'express';
import users from '../controller/users';
import { checkSignupData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/signup', checkSignupData, users.signUserUp);

export default Router;
