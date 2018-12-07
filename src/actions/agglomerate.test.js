import 'babel-polyfill';
import { noCallThru } from 'proxyquire';
import chai, { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const proxyquire = noCallThru();
const backendServiceStub = sinon.stub();
const dispatchSpy = sinon.spy();
const types = {
  AGGLOMERATE_HAS_ERRORED: 'AGGLOMERATE_HAS_ERRORED',
  AGGLOMERATE_IS_LOADING: 'AGGLOMERATE_IS_LOADING',
  AGGLOMERATE_FETCH_DATA_SUCCESS: 'AGGLOMERATE_FETCH_DATA_SUCCESS',
};
let getState;
let defaultState;

const {
  agglomerateHasErrored,
  agglomerateIsLoading,
  agglomerateFetchDataSuccess,
  agglomerateFetchData,
} = proxyquire('./agglomerate', {
  '../constants/action-types': types,
  '../services/backend': backendServiceStub,
});

describe('Action agglomerate', () => {
  beforeEach(() => {
    backendServiceStub.reset();
    backendServiceStub.returns(Promise.resolve());
    dispatchSpy.resetHistory();
    defaultState = {
      agglomerate: {},
    };
    getState = () => defaultState;
  });

  it('should call agglomerateHasErrored successfully', () => {
    let response = agglomerateHasErrored(true);
    expect(response.hasErrored).to.be.equal(true);
    response = agglomerateHasErrored(false);
    expect(response.hasErrored).to.be.equal(false);
  });

  it('should call agglomerateIsLoading successfully', () => {
    let response = agglomerateIsLoading(true);
    expect(response.isLoading).to.be.equal(true);
    response = agglomerateIsLoading(false);
    expect(response.isLoading).to.be.equal(false);
  });

  it('should call agglomerateFetchDataSuccess successfully', () => {
    const data = [{ some: 'data' }];
    const response = agglomerateFetchDataSuccess(data);
    expect(response.data).to.deep.equal(data);
  });

  it('should call agglomerateFetchData successfully', async () => {
    const res = { data: [{ data: 'here!' }] };
    backendServiceStub.returns(Promise.resolve(res));

    await agglomerateFetchData()(dispatchSpy, getState);

    expect(dispatchSpy).to.have.been.calledWith({
      type: types.AGGLOMERATE_IS_LOADING,
      isLoading: true,
    });
    expect(dispatchSpy).to.have.been.calledWith({
      type: types.AGGLOMERATE_IS_LOADING,
      isLoading: false,
    });
    expect(dispatchSpy).to.have.been.calledWith({
      type: types.AGGLOMERATE_FETCH_DATA_SUCCESS,
      data: res.data[0],
    });
  });

  it('should call agglomerateFetchData and return the current state', async () => {
    defaultState.agglomerate = {
      hasLoaded: true,
    };
    expect(await agglomerateFetchData()(dispatchSpy, getState)).to.equal(getState());
  });

  it('should call generalInformationFetchData and fail', async () => {
    backendServiceStub.returns(Promise.reject(new Error('service error')));

    try {
      await agglomerateFetchData()(dispatchSpy, getState);
    } catch (err) {
      expect(dispatchSpy).to.have.been.calledWith({
        type: types.AGGLOMERATE_IS_LOADING,
        isLoading: true,
      });
      expect(dispatchSpy).to.have.been.calledWith({
        type:
        types.AGGLOMERATE_HAS_ERRORED,
        hasErrored: true,
      });
    }
  });
});
