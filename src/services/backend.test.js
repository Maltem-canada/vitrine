import 'babel-polyfill';
import { noCallThru } from 'proxyquire';
import nock from 'nock';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';

const proxyquire = noCallThru();
const config = { backendURL: 'http://the-backend-you-deserve.com' };
let data;

const getAgglomeratedData = proxyquire('./backend', {
  '../config': config,
}).default;

describe('backendService', () => {
  describe('getAgglomeratedData', () => {
    beforeEach(() => {
      data = { some: 'data' };

      nock(config.backendURL)
        .get('/agglomerates')
        .reply(200, data);
    });

    it('should call getAgglomeratedData successfully', async () => {
      const response = await getAgglomeratedData();
      expect(response.data).to.deep.equal(data);
    });
  });
});
