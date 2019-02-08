import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './philosophy.scss';

export class Philosophy extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        philosophyTitle,
        ourPhilosophyPhoto,
        philosophyLastImage,
        philosophies,
      },
    } = this.props;

    const style = {
      background: `url("${config.backendURL}${ourPhilosophyPhoto.url}") center center fixed`,
      zIndex: 0,
    };

    return (
      <div className="philosophy">
        <div className="philosophy-header" style={style}>
          <div className="philosophy-header-anchor" id="philosophy" />
          <h1 className="philosophy-header-title decorate-title">
            {philosophyTitle}
          </h1>
        </div>
        <div className="philosophy-content">
          {
            philosophies.map(({
              id, description, title, logo,
            }) => (
              <div className="philosophy-content-item" key={id}>
                <div className="philosophy-content-item-row">
                  <div className="philosophy-content-item-title">
                    <span className="philosophy-content-item-title-red">{title.slice(0, 1)}</span>
                    <span>{title.slice(1)}</span>
                  </div>
                  <img
                    className="philosophy-content-item-image"
                    alt={`Maltem ${title} philosophy`}
                    src={`${config.backendURL}${logo.url}`}
                  />
                </div>
                <div className="philosophy-content-item-description">{description}</div>
              </div>
            ))
          }
          <div className="philosophy-last-image philosophy-content-item">
            <div className="philosophy-content-item-row">
              <img
                alt="Maltem Aldimie fundation"
                src={`${config.backendURL}${philosophyLastImage.url}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Philosophy.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Philosophy);
