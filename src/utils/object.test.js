import { expect } from 'chai';
import { describe, it } from 'mocha';
import isEmpty from './object';

describe('object isEmpty', () => {
  it('should call isEmpty and return true when no object passed', () => {
    expect(isEmpty()).to.be.equal(true);
  });
  it('should call isEmpty and return true when empty object', () => {
    expect(isEmpty({})).to.be.equal(true);
  });
  it('should call isEmpty and return false when object has some keys', () => {
    expect(isEmpty({ some: 'data' })).to.be.equal(false);
  });
});
