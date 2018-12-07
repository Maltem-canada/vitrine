import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Adapter from 'enzyme-adapter-react-16';
import Conditional from './Conditional.js';

configure({ adapter: new Adapter() });

describe('Conditional', () => {
  it('renders the Conditional component when test is true', () => {
    const wrapper = shallow(
      <Conditional test>
        <div>my child</div>
        <div>my child</div>
        <div>my child</div>
      </Conditional>,
    );
    expect(wrapper.children()).to.have.lengthOf(3);
  });
  it('renders the Conditional component when test is false', () => {
    const wrapper = shallow(
      <Conditional test={false}>
        <div>my child</div>
        <div>my child</div>
        <div>my child</div>
      </Conditional>,
    );
    expect(wrapper.children()).to.have.lengthOf(0);
  });
});
