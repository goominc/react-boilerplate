import React, { PropTypes } from 'react';

const MainImage = ({ src, bullets }) => (
  <div className="main-image">
    <img alt="Main" src={src} />
    {bullets.map((b, i) => <button key={i} {...b} />)}
  </div>
);

MainImage.propTypes = {
  src: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.shape({
    style: PropTypes.shape({
      left: PropTypes.string.isRequired,
      top: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
  })),
};

export default MainImage;
