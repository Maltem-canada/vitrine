import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../actions/agglomerate';
import config from '../config';
import SlideComponent from './Common/Slide/Slide';
import WelcomeComp from './Welcome/Welcome';
import EmployeeBenefitsComp from './EmployeeBenefits/EmployeeBenefits';
import JobsBoardComp from './JobsBoard/JobsBoard';

export class App extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  static getStyle(photo) {
    return {
      background: `url("${config.backendURL}${photo}") center center fixed`,
      backgroundSize: 'cover',
    };
  }

  render() {
    const {
      agglomerate: {
        photoWelcome,
        photoJobsBoard,
      },
    } = this.props;

    return (
      <div id="app-content">
        <SlideComponent style={App.getStyle(photoWelcome.url)} className="slide-welcome" id="welcome">
          <WelcomeComp />
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
