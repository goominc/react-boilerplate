import React, { PropTypes } from 'react';

const MainImage = ({ alt, src, bullets, onClick, showBullets }) => (
  <div className="main-image">
    <a tabIndex="0" onClick={onClick}>
      <img alt={alt} src={src} />
    </a>
    {showBullets ? bullets.map(
      (b, i) => <button key={i} style={b.style} onClick={b.onClick} />) : ''}
  </div>
);

MainImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.shape({
    style: PropTypes.shape({
      left: PropTypes.string.isRequired,
      top: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
  showBullets: PropTypes.bool.isRequired,
};

export default MainImage;
