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
const dispatchStub = sinon.stub();
const removeEventListenerStub = sinon.stub();
const getLanguageStub = sinon.stub();
const setLanguageStub = sinon.stub();

const {
  mapStateToProps, mapDispatchToProps,
} = proxyquire('./Header.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

const { Header } = proxyquire('./Header.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
  '../../services/language': {
    getLanguage: getLanguageStub,
    setLanguage: setLanguageStub,
  },
});

describe('Header', () => {
  beforeEach(() => {
    dispatchStub.resetHistory();
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
      list: [],
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
    getLanguageStub.reset();
    getLanguageStub.returns('en');
    setLanguageStub.reset();
  });

  it('renders the Header component', () => {
    const wrapper = shallow(
      <Header
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('.header-content').children().children()).to.have.lengthOf(9);
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
    wrapper.find('.header-content').children().children().first()
      .simulate('click');
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
    mapDispatchToProps(dispatchStub).agglomerateFetch();
    expect(dispatchStub).to.have.been.callCount(1);
  });
});
