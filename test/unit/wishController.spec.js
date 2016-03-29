'use strict';
let controller = require('../../api/wishController').controller;

describe('wishController',() => {
  describe('getAll()',() => {
    it('Should return an array with a length of 5',(done) => {
      let req = {};
      let res = {
        json: function(data) {
          data.should.be.an.instanceOf(Array);
          data.length.should.equal(5);
          done();
        }
      };
      let next = function() {
        throw new Error('Called next() when it should not have done so.');
      };
      let item = {
        find: function() {
          return {
            exec: function(cb) {
              cb(null, [1, 2, 3, 4, 5])
            }
          }
        }
      };
      controller(item).getAll(req, res, next);
    });
    it('Should call next() with the error as a param on error',(done) => {
      let item = {
        find: function() {
          return {
            exec: function(cb) {
              cb('Error!')
            }
          }
        }
      };
      let req = {};
      let res = {
        json: function() {
          throw new Error('Called res.json when it should not have done so.');
        }
      };
      let next = function(err) {
        err.should.equal('Error!');
        done();
      };
      controller(item).getAll(req,res,next);
    });
  });
  describe('create()', () => {
    it('Should save req body to the collection and return new obj',(done) => {
      let item = function(Obj){
        this.dateAdd = Obj.dateAdd;
        this.itemName = Obj.itemName;
        this.save = function(cb) {
          cb(null,this);
        }
      };
      let req = {
        body:{
          itemName: 'Item Name'
        }
      };
      let res = {
        json: function(data){
          data.should.be.an.instanceOf(Object);
          data.itemName.should.equal('Item Name');
          data.dateAdd.should.be.an.instanceOf(Number);
          done();
        }
      };
      let next = function() {
        throw new Error ('Called next() when it should not have done so.');
      };
      controller(item).create(req,res,next);
    });
    it('Should call next() with the error as a param on error',(done) => {
      let item = function() {
        this.save = function(cb) {
          cb('Error!');
        }
      };
      let req = {
        body: {}
      };
      let res = {
        json: function() {
          throw new Error('Called res.json when it should not have done so.');
        }
      };
      let next = function(err) {
        err.should.equal('Error!');
        done();
      };
      controller(item).create(req,res,next);
    });
  });
  describe('getOne()', () => {
    it('Should return an obj by specific id', (done) => {
      let item = {
        findOne: function(data){
          data._id.should.equal(10);
          return{
            exec: function(cb) {
              cb(null,'Done');
            }
          }
        }
      };
      let req = {
        params: {
          id: 10
        }
      };
      let res = {
        json: function(data) {
          data.should.equal('Done');
          done();
        }
      };
      let next = function() {
        throw new Error('Called next() when it should not have done so.');
      };
      controller(item).getOne(req,res,next);
    });
    it('Should call next() with the error as a param on error', (done) => {
      let item = {
        findOne: function() {
          return{
            exec: function(cb) {
              cb('Error!');
            }
          }
        }
      };
      let req = {
        params: {}
      };
      let res = {
        json: function() {
          throw new Error('Called res.json when it should not have done so.');
        }
      };
      let next = function(err) {
        err.should.equal('Error!');
        done();
      };
      controller(item).getOne(req,res,next);
    });
  });
  describe('remove()', () => {
    it('Should remove an obj', (done) => {
      let item = {
        remove: function(data, cb) {
          data._id.should.equal(1);
          cb(null);
        }
      };
      let req = {
        params: {
          id: 1
        }
      };
      let res = {
        json: function(data) {
          data.message.should.equal('This item has been removed from your wishlist.');
          done();
        }
      };
      let next = function() {
        throw new Error('Called next() when it should not have done so.')
      };
      controller(item).remove(req,res,next);
    });
    it('Should call next() with the error as a param on error', (done) => {
      let item = {
        remove: function(data,cb) {
          cb('Error!');
        }
      };
      let req = {
        params: {}
      };
      let res = {
        json: function() {
          throw new Error('Called res.json when it should not have done so.');
        }
      };
      let next = function(err) {
        err.should.be.equal('Error!');
        done();
      };
      controller(item).remove(req,res,next);
    });
  });
  describe('update()', () => {
    it('Should return a message on success', (done) => {
      let item = {
        update: function(data,body,cb) {
          data._id.should.equal(15);
          body.itemDesc.should.equal('Test');
          cb(null, 1);
        }
      };
      let req = {
        params: {
          id: 15
        },
        body: {
          itemDesc: 'Test'
        }
      };
      let res = {
        json: function(data) {
          data.message.should.equal('This item has been updated!');
          done();
        }
      };
      let next = function() {
        throw new Error('Called next() when it should not have done so.');
      };
      controller(item).update(req,res,next);
    });
    it('Should call next() with the error as a param on error', (done) => {
      let item = {
        update: function(data,body,cb) {
          cb('Error!');
        }
      };
      let req = {
        params: {},
        body: {}
      };
      let res = {
        json: function() {
          throw new Error('Called res.json when it should not have done so.');
        }
      };
      let next = function(err) {
        err.should.equal('Error!');
        done();
      };
      controller(item).update(req,res,next);
    })
  });
});
