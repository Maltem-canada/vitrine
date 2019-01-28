import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './jobs-board.scss';
import config from '../../config';
import { getSlideShowLength, getSlideShowSettings } from '../../utils/slideShow';

export class JobsBoard extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  getPopupContent(data) {
    const { togglePopup } = this.props;
    return (
      <div className="jobs-popup">
        <button
          className="jobs-popup-close"
          type="submit"
          onClick={() => togglePopup(false)}
          onKeyPress={() => togglePopup(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="jobs-popup-content">
          <h1 className="jobs-popup-content-name">{data.name}</h1>
          <div className="jobs-popup-content-description">{data.description}</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      agglomerate: {
        jobsBoardTitle,
        jobs,
        photoJobsBoard,
      },
      togglePopup,
    } = this.props;

    const settings = getSlideShowSettings({
      slidesToShow: getSlideShowLength({
        dataLength: jobs.length,
        maxDisplay: 4,
      }),
    });

    const style = {
      background: `url("${config.backendURL}${photoJobsBoard.url}") center center fixed`,
    };

    return (
      <div style={style} className="jobs">
        <h1 className="jobs-title decorate-title">{jobsBoardTitle}</h1>
        <Slider {...settings} className="jobs-list">
          {
            jobs.map(job => (
              <button
                key={job.id}
                type="submit"
                className="jobs-list-item"
                onClick={() => togglePopup(true, this.getPopupContent(job))}
                onKeyPress={() => togglePopup(true, this.getPopupContent(job))}
              >
                <div>{job.name}</div>
              </button>
            ))
          }
        </Slider>
      </div>
    );
  }
}

JobsBoard.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
  togglePopup: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsBoard);
