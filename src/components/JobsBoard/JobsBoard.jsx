import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './jobs-board.scss';

export class JobsBoard extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        jobsBoardTitle,
        jobs,
      },
    } = this.props;

    return (
      <div className="jobs-board">
        <h1 className="title">{jobsBoardTitle}</h1>
        <div className="jobs">
          {
            jobs.map(({ id, name, description }) => (
              <div key={id} className="jobs-item">
                <div>{name}</div>
                <div>{description}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

JobsBoard.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsBoard);
