import React from 'react';
import PropTypes from 'prop-types';
import './slide.scss';

const Slide = (props) => {
  const { className, children } = props;
  return (
    <div {...props} className={`slide ${className || ''}`}>
      <div className="slide-content">{children}</div>
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Slide.defaultProps = {
  className: '',
};


export default Slide;
