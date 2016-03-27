import * as express from 'express';
import {controller} from '../api/wishController';
import {Wish} from '../models/Wish';

const ctrl = controller(Wish);
const router = express.Router();

//Base Route: /api/v1/wishlist

//GET: /api/v1/wishlist
router.get('/',ctrl.getAll);

//GET: /api/v1/wishlist/:id
router.get('/:id', ctrl.getOne);

//POST: /api/v1/wishlist
router.post('/', ctrl.create);

//PUT: /api/v1/wishlist/:id
router.put('/:id', ctrl.update);

//DELETE: /api/v1/wishlist/:id
router.delete('/:id', ctrl.remove);

export = router;
