'use strict';
let should = require('should');
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
    // it('Should call next() with the error as a param on error',(done) => {
    //   let item = {
    //     find: function() {
    //       return {
    //         exec: function(cb) {
    //           cb('Error!')
    //         }
    //       }
    //     }
    //   };
    //   let req = {};
    //   let res = {
    //     json: function() {
    //       throw new Error('Called res.json when it should not have done so.');
    //     }
    //   };
    //   let next = function(err) {
    //     err.should.equal('Error!');
    //     done();
    //   };
    //   controller(item).getAll(req,res,next);
    // });
  });
});
