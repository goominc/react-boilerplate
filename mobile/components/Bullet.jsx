import React, { PropTypes } from 'react';

const Bullet = ({ left, top, onClick }) => (
  <button className="bullet" style={{ left, top }} onClick={onClick} />
);

Bullet.propTypes = {
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
