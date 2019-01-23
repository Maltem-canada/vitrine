import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './expertise.scss';

export class Expertise extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        expertiseTitle,
        expertise,
      },
    } = this.props;

    return (
      <div className="expertise">
        <h1 className="expertise-title">{expertiseTitle}</h1>
        <div className="hashtags">
          {
            expertise.map(({
              hashtag, description, logo, id,
            }) => (
              <div className="hashtags-item" key={id}>
                <img
                  className="hashtags-item-image"
                  alt={`Maltem ${hashtag} expertise`}
                  src={config.backendURL + logo.url}
                />
                <p className="hashtags-item-hashtag">{hashtag}</p>
                <p className="hashtags-item-description">{description}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Expertise.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expertise);
