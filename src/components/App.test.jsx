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
const dispatchSpy = sinon.spy();

const App = proxyquire('./App.jsx', {
  './Common/Slide/Slide': '',
  './Welcome/Welcome': '',
  './JobsBoard/JobsBoard': '',
  './Expertise/Expertise': '',
  './Service/Service': '',
  './Philosophy/Philosophy': '',
  './Team/Team': '',
  './Group/Group': '',
}).default;

describe('App', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
  });

  it('renders the App component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#app-content').children()).to.have.lengthOf(9);
  });

  it('renders the App component and display the popup', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().togglePopup(true, <div className="my-test-class">some data</div>);
    expect(wrapper.find('#popup').find('.my-test-class')).to.have.lengthOf(1);
    expect(wrapper.find('#popup').props().className).to.equal('popup-show');
    wrapper.instance().togglePopup(false, <div className="my-test-class">some data</div>);
    expect(wrapper.find('#popup').children()).to.have.lengthOf(0);
    expect(wrapper.find('#popup').props().className).to.equal('popup-hide');
  });
});
