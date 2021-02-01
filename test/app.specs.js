/* eslint-disable no-unused-vars */
// this needs to be disabled so should can be used as intended
const chai = require('chai');
const chaiHttp = require('chai-http');
const { it, describe } = require('mocha');
const server = require('../server/app');

chai.use(chaiHttp);
// eslint-disable-next-line prefer-const
let should = chai.should();

describe('GET Operation', () => {
  it('Should get operation correctly', (done) => {
    chai.request(server).get('/task').end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('operationId');
      res.body.should.have.property('operationName');
      res.body.should.have.property('leftOp');
      res.body.should.have.property('rightOp');
      res.body.should.have.property('result');
      done();
    });
  });
});

describe('POST Operation', () => {
  it('Should post operation succesfully', (done) => {
    chai.request(server).get('/task').end((err, res) => {
      res.body.should.have.property('operationId');
      chai.request(server)
        .post('/task').send({
          id: res.body.operationId,
          result: res.body.result,
        }).end((_error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});

describe('POST Operation wrong Id', () => {
  it('Should catch 404 error', (done) => {
    chai.request(server)
      .post('/task').send({
        id: 2312,
        result: 56,
      }).end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.have.property('errorMessage');
        done();
      });
  });
});

describe('POST Operation wrong result', () => {
  it('Should catch 400 error', (done) => {
    chai.request(server).get('/task').end((err, res) => {
      res.body.should.have.property('operationId');
      chai.request(server)
        .post('/task').send({
          id: res.body.operationId,
          result: res.body.operationId - 1,
        }).end((_error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errorMessage');
          done();
        });
    });
  });
});
