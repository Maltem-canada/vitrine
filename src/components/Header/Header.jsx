import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import MaltemLogo from '../../assets/img/maltem-logo.png';
import './header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      percentageScroll: 0,
      headerClass: '',
    };
  }

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollPos = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    this.setState({
      percentageScroll: (scrollPos) * 100 / (documentHeight - windowHeight),
      headerClass: ((scrollPos + 10) > windowHeight) ? 'header-fixed' : '',
    });
  }

  render() {
    const {
      agglomerate: {
        headerExpertiseTitle,
        headerServiceTitle,
        headerPhilosophyTitle,
        headerTeamTitle,
        headerJobsTitle,
        headerGroupTitle,
        headerContactTitle,
      },
    } = this.props;
    const {
      percentageScroll,
      headerClass,
    } = this.state;
    const indicatorStyle = {
      width: `${percentageScroll}%`,
    };

    return (
      <nav className={`header ${headerClass}`}>
        <div className="header-content">
          <a href="#welcome">
            <img className="header-logo" src={MaltemLogo} alt="Maltem logo" />
          </a>
          <a href="#expertise">{headerExpertiseTitle}</a>
          <a href="#services">{headerServiceTitle}</a>
          <a href="#philosophy">{headerPhilosophyTitle}</a>
          <a href="#team">{headerTeamTitle}</a>
          <a href="#jobs-board">{headerJobsTitle}</a>
          <a href="#group">{headerGroupTitle}</a>
          <a href="#contact">{headerContactTitle}</a>
        </div>
        <div className="header-scroll">
          <div className="header-scroll-indicator" style={indicatorStyle} />
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
