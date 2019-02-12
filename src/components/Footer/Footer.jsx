import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import getGA from '../../services/googleAnalytics';
import './footer.scss';

export class Footer extends Component {
  static handleClick(target) {
    getGA().event({
      category: 'User',
      action: 'Click Footer',
      label: target,
    });
  }

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        address1,
        address2,
        address3,
        address4,
        phoneNumber,
        email,
        footerClosure,
        locationTitle,
        contactTitle,
      },
    } = this.props;

    return (
      <div className="footer">
        <div>
          <div>
            <h1 className="footer-title-left decorate-title">{locationTitle.toUpperCase()}</h1>
            {address1}
            <br />
            {address2}
            <br />
            {address3}
            <br />
            {address4}
          </div>
          <div className="footer-right" id="contact">
            <h1 className="footer-title-right decorate-title-right">{contactTitle.toUpperCase()}</h1>
            <a onClick={() => Footer.handleClick('Email')} href={`mailto:${email}`}>{email}</a>
            <br />
            <a onClick={() => Footer.handleClick('Phone number')} href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </div>
        </div>
        <div className="footer-closure">
          {footerClosure}
          { ' ' }
          -
          { ' ' }
          <a onClick={() => Footer.handleClick('GitHub')} rel="noopener noreferrer" target="_blank" href="https://github.com/orgs/Maltem-canada">GitHub</a>
          .
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
