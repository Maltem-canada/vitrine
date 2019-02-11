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
const removeEventListenerStub = sinon.stub();

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
      maltemLogo: {},
      cursor32x32: {},
    };
    global.window = {
      addEventListener: () => {},
      removeEventListener: removeEventListenerStub,
      scrollY: 0,
      innerHeight: 10,
    };
    global.document = {
      documentElement: {},
      getElementsByTagName: () => [{ style: {} }],
    };
    removeEventListenerStub.reset();
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

  it('renders the Header component and handleClickOutside', () => {
    const wrapper = shallow(
      <Header
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.state().displayHeader === 'hide');
    expect(wrapper.find('.header-content').props().className).to.equal('header-content hide');
    wrapper.instance().headerClicked();
    expect(wrapper.find('.header-content').props().className).to.equal('header-content show');
    wrapper.find('.header-content').children().first().simulate('click');
    expect(wrapper.find('.header-content').props().className).to.equal('header-content hide');
    wrapper.instance().headerClicked();
    expect(wrapper.find('.header-content').props().className).to.equal('header-content show');
    expect( // eslint-disable-line no-unused-expressions
      removeEventListenerStub,
    ).to.not.have.been.called;
    wrapper.unmount();
    expect( // eslint-disable-line no-unused-expressions
      removeEventListenerStub,
    ).to.have.been.calledTwice;
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
