import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './expertise.scss';

export class Expertise extends Component {
  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  changeHashtag(hashtag) {
    this.setState({
      select: hashtag,
    });
  }

  render() {
    const {
      agglomerate: {
        expertiseTitle,
        expertise,
      },
    } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    const select = (this.state && this.state.select)
      || (expertise.length && expertise[0].hashtag);

    return (
      <div className="expertise">
        <h1 className="title">{expertiseTitle}</h1>
        <div className="hashtags">
          {
            expertise.map(({ id, hashtag }) => (
              <span key={id} className="hashtags-item">
                <button
                  type="button"
                  onKeyPress={() => this.changeHashtag(hashtag)}
                  onClick={() => this.changeHashtag(hashtag)}
                >
                  #
                  {hashtag}
                </button>
              </span>
            ))
          }
        </div>
        <div className="exps">
          {
            expertise.map(({
              id,
              logo,
              description,
              hashtag,
            }) => {
              const cl = (select === hashtag) ? 'show' : 'hide';

              return (
                <div className={`exps-item ${cl}`} key={id}>
                  <img src={`${config.backendURL}${logo.url}`} alt="logo" />
                  <div className="exps-item-description">{description}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Expertise.propTypes = {
  agglomerateFetch: PropTypes.func.isRequired,
  agglomerate: PropTypes.objectOf(Object).isRequired,
};

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expertise);
