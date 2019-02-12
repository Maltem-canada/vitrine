import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { agglomerateFetchData } from '../../actions/agglomerate';
import { setLanguage } from '../../services/language';
import getGA from '../../services/googleAnalytics';
import config from '../../config';
import './header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.headerClicked = this.headerClicked.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {
      percentageScroll: 0,
      headerClass: '',
      displayHeader: 'hide',
    };
  }

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
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

  headerClicked(target) {
    const { displayHeader } = this.state;
    this.setState({
      displayHeader: (displayHeader === 'hide') ? 'show' : 'hide',
    });
    getGA().event({
      category: 'User',
      action: 'Click Header',
      label: target,
    });
  }

  handleClickOutside(event) {
    const {
      wrapperRef,
      state: {
        displayHeader,
      },
    } = this;
    const isMenuHandler = event.target.className.constructor.name === 'SVGAnimatedString';
    if (
      wrapperRef
      && !wrapperRef.contains(event.target)
      && displayHeader === 'show'
      && !isMenuHandler
    ) {
      this.setState({
        displayHeader: 'hide',
      });
    }
  }

  changeLanguage(event) {
    const lang = event.target.value;
    setLanguage(lang);
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
    getGA().event({
      category: 'User',
      action: 'Change Language',
      label: lang,
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
        maltemLogo,
        cursor32x32,
        list,
        languagePlaceholder,
      },
    } = this.props;
    const {
      percentageScroll,
      headerClass,
      displayHeader,
    } = this.state;
    const indicatorStyle = {
      width: `${percentageScroll}%`,
    };

    document.getElementsByTagName('body')[0].style.cursor = `url(${config.backendURL}${(cursor32x32) ? cursor32x32.url : ''}), auto`;
    return (
      <nav className={`header ${headerClass}`}>
        <div className={`header-content ${displayHeader}`} ref={this.setWrapperRef}>
          <div>
            <a onClick={() => this.headerClicked('Logo')} href="#welcome">
              <img className="header-logo" src={config.backendURL + maltemLogo.url} alt="Maltem logo" />
            </a>
            <a onClick={() => this.headerClicked('Expertise')} href="#expertise">{headerExpertiseTitle}</a>
            <a onClick={() => this.headerClicked('Services')} href="#services">{headerServiceTitle}</a>
            <a onClick={() => this.headerClicked('Philosophy')} href="#philosophy">{headerPhilosophyTitle}</a>
            <a onClick={() => this.headerClicked('Team')} href="#team">{headerTeamTitle}</a>
            <a onClick={() => this.headerClicked('Group')} href="#group">{headerGroupTitle}</a>
            <a onClick={() => this.headerClicked('Jobs')} href="#jobs-board">{headerJobsTitle}</a>
            <a onClick={() => this.headerClicked('Contact')} href="#contact">{headerContactTitle}</a>
          </div>
          <div>
            <select onChange={this.changeLanguage} value="default">
              <option value="default" disabled>{languagePlaceholder}</option>
              {
                list.map(l => (
                  <option key={l.language} value={l.language.toLowerCase()}>
                    {l.name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="header-scroll">
          <div className="header-scroll-indicator" style={indicatorStyle} />
        </div>
        <FontAwesomeIcon onClick={this.headerClicked} className="header-handler" icon={faGripLines} />
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
