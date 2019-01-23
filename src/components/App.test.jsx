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
  './Location/Location': '',
}).default;

describe('App', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
  });

  it('renders the App component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#app-content').children()).to.have.lengthOf(8);
  });
});
