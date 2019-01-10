import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../actions/agglomerate';
import config from '../config';
import SlideComponent from './Common/Slide/Slide';
import WelcomeComp from './Welcome/Welcome';
import EmployeeBenefitsComp from './EmployeeBenefits/EmployeeBenefits';
import JobsBoardComp from './JobsBoard/JobsBoard';
import ExpertiseComp from './Expertise/Expertise';
import TransitionComp from './Common/Transition/Transition';

export class App extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  static getStyle(photo) {
    return {
      background: `url("${config.backendURL}${photo}") center center fixed`,
    };
  }

  render() {
    const {
      agglomerate: {
        photoWelcome,
        photoJobsBoard,
        transition1Photo,
        transition1Text,
      },
    } = this.props;

    return (
      <div id="app-content">
        <SlideComponent style={App.getStyle(photoWelcome.url)} className="slide-welcome" id="welcome">
          <WelcomeComp />
        </SlideComponent>
        <SlideComponent className="slide-expertise" id="expertise">
          <ExpertiseComp />
        </SlideComponent>
        <SlideComponent style={App.getStyle(transition1Photo.url)} className="slide-expertise" id="expertise">
          <TransitionComp
            content={transition1Text}
          />
        </SlideComponent>
        <SlideComponent className="slide-employee" id="employee-benefits">
          <EmployeeBenefitsComp />
        </SlideComponent>
        <SlideComponent style={App.getStyle(photoJobsBoard.url)} className="slide-jobs" id="jobs-board">
          <JobsBoardComp />
        </SlideComponent>
      </div>
    );
  }
}

App.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
