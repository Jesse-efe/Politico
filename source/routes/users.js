import express from 'express';
import users from '../controller/users';
import { checkSignupData, checkLoginData } from '../middlewares/validations';

const Router = express.Router();

Router.post('/signup', checkSignupData, users.signUserUp);
Router.post('/login', checkLoginData, users.logUserIn);

export default Router;
