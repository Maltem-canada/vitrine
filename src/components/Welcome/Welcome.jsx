import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './welcome.scss';

export class Welcome extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        titleWhite,
        titleRed,
        titleSub,
      },
    } = this.props;

    return (
      <div className="welcome">
        <h1>
          {titleWhite}
          <span className="red">{titleRed}</span>
        </h1>
        <p>
          {titleSub}
        </p>
      </div>
    );
  }
}

Welcome.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
