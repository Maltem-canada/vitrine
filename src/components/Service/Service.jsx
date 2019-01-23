import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './service.scss';

export class Service extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        servicesTitle,
        services,
      },
    } = this.props;

    return (
      <div className="service">
        <div className="service-wrapper">
          <h1 className="service-title">{servicesTitle}</h1>
          <div className="service">
            {
              services.map(({ name, id }) => <div key={id} className="service-item">{name}</div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

Service.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);
