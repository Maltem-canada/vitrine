import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { agglomerateFetchData } from '../../actions/agglomerate';
import { getSlideShowLength, getSlideShowSettings } from '../../utils/slideShow';
import getGA from '../../services/googleAnalytics';
import config from '../../config';
import './jobs-board.scss';

export class JobsBoard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
          <pre className="jobs-popup-content-description">{data.description}</pre>
          <a className="jobs-popup-content-apply" href={`mailto:job.canada@maltem.com?subject=${`Application for ${data.name}`}`}>Apply</a>
        </div>
      </div>
    );
  }

  handleClick(content) {
    const { togglePopup } = this.props;
    togglePopup(true, this.getPopupContent(content));
    getGA().event({
      category: 'User',
      action: 'Click Job',
      label: content.name,
    });
  }

  render() {
    const {
      agglomerate: {
        jobsBoardTitle,
        jobs,
        photoJobsBoard,
      },
    } = this.props;

    const settings = getSlideShowSettings({
      slidesToShow: getSlideShowLength({
        dataLength: jobs.length,
        maxDisplay: 4,
      }),
      autoplaySpeed: 5000,
      speed: 1000,
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
                onClick={() => this.handleClick(job)}
                onKeyPress={() => this.handleClick(job)}
              >
                <div>{job.name}</div>
              </button>
            ))
          }
        </Slider>
        <div>
          {`${jobs.length} Positions`}
        </div>
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
