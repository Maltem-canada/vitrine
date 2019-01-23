import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './footer.scss';

export class Footer extends Component {
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
      },
    } = this.props;

    return (
      <div className="footer">
        <div>
          <div>
            <h1 className="footer-title-left">LOCATION</h1>
            {address1}
            <br />
            {address2}
            <br />
            {address3}
            <br />
            {address4}
          </div>
          <div className="footer-right" id="contact">
            <h1 className="footer-title-right">CONTACT</h1>
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </div>
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
