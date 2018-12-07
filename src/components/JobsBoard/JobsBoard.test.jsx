import React from 'react';
import { configure, shallow } from 'enzyme';
import { noCallThru } from 'proxyquire';
import chai, { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai';
import { JobsBoard } from './JobsBoard.jsx';

chai.should();
chai.use(sinonChai);

configure({ adapter: new Adapter() });
const proxyquire = noCallThru();
let agglomerate;
const dispatchSpy = sinon.spy();

const {
  mapStateToProps, mapDispatchToProps,
} = proxyquire('./JobsBoard.jsx', {
  '../../actions/agglomerate': {
    agglomerateFetchData: () => {},
  },
});

describe('JobsBoard', () => {
  beforeEach(() => {
    dispatchSpy.resetHistory();
    agglomerate = {
      jobsBoardTitle: '',
      jobs: [
        { id: 1, name: '', description: 'desc1' },
        { id: 2, name: '', description: 'desc2' },
        { id: 3, name: '', description: 'desc3' },
        { id: 4, name: '', description: 'desc4' },
      ],
    };
  });

  it('renders the JobsBoard component', () => {
    const wrapper = shallow(
      <JobsBoard
        agglomerateFetch={() => {}}
        agglomerate={agglomerate}
      />,
    );
    expect(wrapper.find('.jobs').children()).to.have.lengthOf(4);
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
