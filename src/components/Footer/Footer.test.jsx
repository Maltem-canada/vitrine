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
} = proxyquire('./Footer.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

const { Footer } = proxyquire('./Footer.jsx', {
  '../SocialNetwork/SocialNetwork': '',
});

describe('Footer', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
    agglomerate = {
      socialnetworks: {},
    };
  });

  it('renders the Footer component', () => {
    const wrapper = shallow(
      <Footer
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('.footer > div').children()).to.have.lengthOf(2);
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
