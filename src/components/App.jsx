import React, { Component } from 'react';
import SlideComponent from './Common/Slide/Slide';
import WelcomeComp from './Welcome/Welcome';
import JobsBoardComp from './JobsBoard/JobsBoard';
import ExpertiseComp from './Expertise/Expertise';
import ServiceComp from './Service/Service';
import PhilosophyComp from './Philosophy/Philosophy';
import TeamComp from './Team/Team';
import LocationComp from './Location/Location';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: {
        content: '',
        display: false,
      },
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(display, content) {
    this.setState({
      popup: {
        content: display ? content : '',
        display,
      },
    });
  }

  render() {
    const {
      popup: {
        display,
        content,
      },
    } = this.state;

    const classPopup = display ? 'popup-show' : 'popup-hide';

    return (
      <div id="app-content">
        <SlideComponent className="slide-welcome" id="welcome">
          <WelcomeComp />
        </SlideComponent>
        <SlideComponent className="slide-expertise" id="expertise">
          <ExpertiseComp />
        </SlideComponent>
        <SlideComponent className="slide-services" id="services">
          <ServiceComp />
        </SlideComponent>
        <SlideComponent className="slide-philosophy">
          <PhilosophyComp />
        </SlideComponent>
        <SlideComponent className="slide-team" id="team">
          <TeamComp />
        </SlideComponent>
        <SlideComponent className="slide-group" id="group">
          <LocationComp />
        </SlideComponent>
        <SlideComponent className="slide-jobs" id="jobs-board">
          <JobsBoardComp
            togglePopup={this.togglePopup}
          />
        </SlideComponent>
        <div id="popup" className={classPopup}>{content}</div>
      </div>
    );
  }
}
