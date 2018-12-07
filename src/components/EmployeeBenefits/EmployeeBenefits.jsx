import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './employee-benefits.scss';

export class EmployeeBenefits extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        benefitsTitle,
        benefits,
      },
    } = this.props;

    return (
      <div className="employee">
        <h1 className="title">{benefitsTitle}</h1>
        <div className="employee-benefits">
          {
            benefits.map(({ id, logo, description }) => (
              <div className="employee-benefits-item" key={id}>
                <img src={`${config.backendURL}${logo.url}`} alt="logo" />
                <div className="employee-benefits-item-content">{description}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

EmployeeBenefits.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeBenefits);
