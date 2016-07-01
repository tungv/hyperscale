import Primus from 'primus';
import fetch from 'isomorphic-fetch';
import { expect } from 'chai';
import * as MESSAGES from '../src/copy.js';

const serverURI = 'http://localhost:8080'

describe('Connection', () => {
  let spec;
  let Socket;

  before((done) => {
    fetch(`${ serverURI }/primus/spec`)
      .then(response => response.json())
      .then(_spec => Socket = Primus.createSocket(spec))
      .then(() => done());
  });

  context('# basic connection', function () {
    let primus;
    before((done) => {
      primus = new Socket(serverURI);
      primus.on('open', spark => done())
    });

    after(() => primus.destroy());

    it('should connect', (done) => {
      primus.once('data', (data) => {
        expect(data).equal(MESSAGES.ERROR_SENDING_TO_SERVER_NOT_SUPPORTED);
        done();
      });
      primus.write('hello');
    });

    it('should do nothing to store', (done) => {
      primus.once('data', data => {
        expect(data).eql({});
        done();
      });

      primus.write('GET_STORE');
    });
  });

  context('# connection with clientId', function () {
    let primus;

    before((done) => {
      primus = new Socket(`${serverURI}?clientId=test_user`);
      primus.on('open', spark => done())
    });

    after(() => primus.destroy());

    it('should add connection to store', (done) => {
      primus.once('data', data => {
        expect(data).to.have.property('test_user');
        done();
      });

      primus.write('GET_STORE');
    });

    it('should remove connection from store', () => {
      primus.once('data', data => {
        expect(data).eql({});
        done();
      });
      primus.end();
      primus.write('GET_STORE');
    });
  });
});
