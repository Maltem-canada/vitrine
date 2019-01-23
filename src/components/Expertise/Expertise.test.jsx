import React from 'react';
import { configure, shallow } from 'enzyme';
import { noCallThru } from 'proxyquire';
import chai, { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai';
import { Expertise } from './Expertise.jsx';

chai.should();
chai.use(sinonChai);

configure({ adapter: new Adapter() });
const proxyquire = noCallThru();
let agglomerate;
const dispatchSpy = sinon.spy();

const {
  mapStateToProps, mapDispatchToProps,
} = proxyquire('./Expertise.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

describe('Expertise', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
    agglomerate = {
      expertiseTitle: '',
      expertise: [
        {
          id: 1,
          logo: { src: '' },
          description: '',
          hashtag: '1',
        },
        {
          id: 2,
          logo: { src: '' },
          description: '',
          hashtag: '2',
        },
        {
          id: 3,
          logo: { src: '' },
          description: '',
          hashtag: '3',
        },
      ],
    };
  });

  it('renders the Expertise component', () => {
    const wrapper = shallow(
      <Expertise
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('.hashtags').children()).to.have.lengthOf(3);
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
