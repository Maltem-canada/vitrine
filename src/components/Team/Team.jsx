import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './team.scss';

export class Team extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        teammembers,
        teamTitle,
      },
    } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      initialSlide: 0,
      pauseOnFocus: true,
      pauseOnDotsHover: true,
      pauseOnHover: true,
    };

    const shuffleArray = arr => arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    return (
      <div className="team">
        <h1 className="team-title">{teamTitle}</h1>
        <Slider {...settings} className="team-list">
          {
            shuffleArray(teammembers).map(({
              id, photo, position, name,
            }) => (
              <div key={id} className="team-list-member">
                <img
                  src={`${config.backendURL}${photo.url}`}
                  alt={`Maltem ${name} team member`}
                />
                <div className="team-list-member-description">
                  <div>{name}</div>
                  <div>{position}</div>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}

Team.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
