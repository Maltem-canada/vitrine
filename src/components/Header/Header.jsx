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
      transparent: 0,
      percentageScroll: 0,
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
      transparent: 1 - (windowHeight - scrollPos) / windowHeight,
      percentageScroll: (scrollPos) * 100 / (documentHeight - windowHeight),
    });
  }

  render() {
    const {
      agglomerate: {
        benefitsTitle,
        jobsBoardTitle,
      },
    } = this.props;
    const {
      transparent,
      percentageScroll,
    } = this.state;

    const headerStyle = {
      backgroundColor: `rgba(17,17,17,${transparent})`,
    };
    const indicatorStyle = {
      width: `${percentageScroll}%`,
    };

    return (
      <nav className="header" style={headerStyle}>
        <ul>
          <li>
            <a href="#welcome">
              <img className="header-logo" src={MaltemLogo} alt="Maltem logo" />
            </a>
          </li>
          <li>
            <a href="#employee-benefits">{benefitsTitle}</a>
          </li>
          <li>
            <a href="#jobs-board">{jobsBoardTitle}</a>
          </li>
        </ul>
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
