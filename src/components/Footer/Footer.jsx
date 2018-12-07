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
        phoneNumber,
        email,
      },
    } = this.props;

    return (
      <div className="footer">
        <div>
          <div>
            <h4>Location</h4>
            {address1}
            <br />
            {address2}
            <br />
            {address3}
          </div>
          <div>
            <h4>Contact</h4>
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
