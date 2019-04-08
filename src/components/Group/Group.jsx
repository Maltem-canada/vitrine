import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './group.scss';

export class Group extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        groupTitle,
        locationImage,
        filiales,
      },
    } = this.props;

    return (
      <div className="group">
        <h1 className="decorate-title">{groupTitle}</h1>
        <div className="group-list">
          {
            filiales.map(filiale => (
              <div>
                <a className="group-list-link" rel="noopener noreferrer" target="_blank" href={filiale.link}>
                  <img className="group-list-link-image" alt={filiale.image.name} src={`${config.backendURL}${filiale.image.url}`} />
                </a>
              </div>
            ))
          }
        </div>
        <img className="group-locations" alt={locationImage.name} src={`${config.backendURL}${locationImage.url}`} />
      </div>
    );
  }
}

Group.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
