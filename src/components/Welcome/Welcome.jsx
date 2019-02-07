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
        <div>
          { welcomeSentence
            && (
            <Typist
              className="welcome-typing"
              stdTypingDelay={10}
              avgTypingDelay={10}
              cursor={{
                show: true,
                blink: true,
                element: '|',
              }}
            >
              {welcomeSentence}
            </Typist>
            )
          }
        </div>
        <div className="welcome-main">
          <div className="welcome-main-back" style={style} />
          <div className="welcome-main-front">
            <div className="welcome-main-front-square">
              <div className="welcome-main-front-square-left">
                <div>{titleSub}</div>
              </div>
              <div className="welcome-main-front-square-right">
                <div>
                  <div>{titleWhite}</div>
                  <div className="welcome-red">{titleRed}</div>
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
