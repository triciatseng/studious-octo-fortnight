import * as express from 'express';
import {IWishModel} from '../models/Wish';
import * as mongoose from 'mongoose';
import {Wish} from '../models/Wish';

export function controller(Wish: mongoose.Model<IWishModel>) {
  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove
  }
}

function getAll(req:express.Request, res:express.Response, next:Function) {
  Wish.find({})
    .exec((err,items) => {
      if (err) return next (err);
      res.json (items);
    });
}

function getOne(req: express.Request, res: express.Response, next: Function) {
  Wish.findOne({_id: req.params.id})
    .exec((err, data) => {
      if (err) return next (err);
      res.json (data);
    });
}

function create(req: express.Request, res: express.Response, next: Function) {
  req.body.dateAdd = Date.now();
  let i = new Wish(req.body);
  i.save ((err, item: IWishModel) => {
    if (err) return next (err);
    res.json (item);
  });
}

function update(req: express.Request, res: express.Response, next: Function) {
  Wish.update({_id: req.params.id},req.body,(err,numRows) => {
    if (err) return next (err);
    res.json ({message: 'This item has been updated!'});
  });
}

function remove(req: express.Request, res: express.Response, next: Function) {
  Wish.remove({_id:req.params.id},(err) => {
    if (err) return next (err);
    res.json ({message: 'This item has been removed from your wishlist.'});
  });
}
