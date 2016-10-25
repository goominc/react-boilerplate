import React, { PropTypes } from 'react';

import Bullet from 'components/Bullet';

const MainImage = ({ src, bullets }) => (
  <div className="main-image">
    <img alt="Main" src={src} />
    {bullets.map(bullet => (<Bullet {...bullet} />))}
  </div>
);

MainImage.propTypes = {
  src: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
};

export default MainImage;
