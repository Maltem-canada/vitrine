import React from 'react';
import { configure, shallow } from 'enzyme';
import { noCallThru } from 'proxyquire';
import chai, { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai';
import { Header } from './Header.jsx';

chai.should();
chai.use(sinonChai);

configure({ adapter: new Adapter() });
const proxyquire = noCallThru();
let agglomerate;
const dispatchSpy = sinon.spy();

const {
  mapStateToProps, mapDispatchToProps,
} = proxyquire('./Header.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

describe('Header', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
    agglomerate = {
      headerExpertiseTitle: '',
      headerServiceTitle: '',
      headerPhilosophyTitle: '',
      headerTeamTitle: '',
      headerJobsTitle: '',
      headerGroupTitle: '',
      headerContactTitle: '',
    };
    global.window = {
      addEventListener: (action, fct) => {
        fct();
      },
      scrollY: 0,
      innerHeight: 10,
    };
    global.document = {
      documentElement: {},
    };
  });

  it('renders the Header component', () => {
    const wrapper = shallow(
      <Header
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('.header-content').children()).to.have.lengthOf(8);
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
