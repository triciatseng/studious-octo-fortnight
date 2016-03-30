import * as express from 'express';
import { controller } from '../api/userController';
import { User } from '../models/User';

const router = express.Router();
const ctrl = controller(User);

//Base Route: /api/v1/users

export = router;
