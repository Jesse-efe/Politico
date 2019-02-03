import express from 'express';
import vote from '../controller/vote';
import isLoggedIn from '../middlewares/isLoggedIn';
import { checkPostVote } from '../middlewares/validations';

const Router = express.Router();

Router.post('/', isLoggedIn, checkPostVote, vote.postVote);

export default Router;
