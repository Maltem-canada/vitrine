import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './welcome.scss';
import config from '../../config';

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 'none', margin: '100vh' };
    this.stopTyping = this.stopTyping.bind(this);
  }

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  stopTyping() {
    this.setState({ display: '', margin: 0 });
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

    const { display, margin } = this.state;
    const style = { display };

    return (
      <div className="welcome">
        <div style={{ marginBottom: margin }}>
          { welcomeSentence
            && (
            <Typist
              className="welcome-typing"
              onTypingDone={this.stopTyping}
              stdTypingDelay={10}
              avgTypingDelay={10}
              cursor={{ blink: true }}
            >
              {welcomeSentence}
            </Typist>
            )
          }
        </div>
        <h1 style={style}>
          <span className="welcome-red">{titleWhite}</span>
          &nbsp;
          <span>{titleRed}</span>
        </h1>
        <img
          style={style}
          className="welcome-image"
          src={config.backendURL + photoWelcome.url}
          alt="Maltem Welcome"
        />
        <p style={style}>
          {titleSub}
        </p>
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
