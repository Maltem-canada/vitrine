import React from 'react';
import PropTypes from 'prop-types';
import './transition.scss';

const Transition = ({ content }) => (
  <div className="transition">
    <h1>{content}</h1>
  </div>
);

Transition.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Transition;
