import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Adapter from 'enzyme-adapter-react-16';
import Slide from './Slide.jsx';

configure({ adapter: new Adapter() });

describe('Slide', () => {
  it('renders the Slide component', () => {
    const wrapper = shallow(
      <Slide someprop="prop value">
        <div>my child</div>
        <div>my child</div>
        <div>my child</div>
      </Slide>,
    );
    expect(wrapper.find('.slide-content').children()).to.have.lengthOf(3);
  });
});
