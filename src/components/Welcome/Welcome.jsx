import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import 'react-typist/dist/Typist.css';
import './welcome.scss';

export class Welcome extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        photoWelcome,
        titleWhite,
        titleRed,
        titleSub,
        welcomeSentence,
      },
    } = this.props;

    const style = {
      backgroundImage: `url("${config.backendURL + photoWelcome.url}")`,
    };

    return (
      <div className="welcome">
        <div className="welcome-container">
          { welcomeSentence
            && (
            <Typist
              key={new Date().getTime()}
              className="welcome-container-typing"
              stdTypingDelay={10}
              avgTypingDelay={10}
              cursor={{
                show: true,
                blink: true,
                element: <div className="square-cursor" />,
              }}
            >
              {welcomeSentence}
            </Typist>
            )
          }
        </div>
        <div className="welcome-main">
          <div className="welcome-main-back">
            <div className="welcome-main-back-astro" style={style} />
          </div>
          <div className="welcome-main-background" />
          <div className="welcome-main-front">
            <div className="welcome-main-front-square">
              <div className="welcome-main-front-square-left">
                <div>
                  <div className="welcome-main-front-square-left-title">{titleSub}</div>
                </div>
              </div>
              <div className="welcome-main-front-square-right">
                <div className="welcome-main-front-square-right-top">
                  <div>
                    <div className="welcome-main-front-square-right-title">
                      <div>{titleWhite}</div>
                      <div className="welcome-red">{titleRed}</div>
                    </div>
                  </div>
                </div>
                <div className="welcome-main-front-square-right-bottom">
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Welcome.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
