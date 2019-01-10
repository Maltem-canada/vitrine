import React from 'react';
import { configure, shallow } from 'enzyme';
import { noCallThru } from 'proxyquire';
import chai, { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

configure({ adapter: new Adapter() });
const proxyquire = noCallThru();
let agglomerate;
const dispatchSpy = sinon.spy();

const {
  mapStateToProps, mapDispatchToProps,
} = proxyquire('./App.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

const { App } = proxyquire('./App.jsx', {
  './Common/Slide/Slide': '',
  './Welcome/Welcome': '',
  './GeneralInformation/GeneralInformation': '',
  './Team/Team': '',
  './KeyFigures/KeyFigures': '',
});

describe('App', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
    agglomerate = {
      photoWelcome: {},
      photoJobsBoard: {},
      transition1Photo: {},
    };
  });

  it('renders the App component', () => {
    const wrapper = shallow(
      <App
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('#app-content').children()).to.have.lengthOf(5);
  });

  it('test the mapStateToProps function', () => {
    const props = mapStateToProps({
      agglomerate,
    });
    expect(props).to.have.be.deep.equal({
      agglomerate,
    });
  });

  it('test the mapDispatchToProps function', () => {
    mapDispatchToProps(dispatchSpy).agglomerateFetch();
    expect(dispatchSpy).to.have.been.callCount(1);
  });
});
