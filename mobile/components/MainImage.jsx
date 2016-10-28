import React, { PropTypes } from 'react';

const MainImage = ({ alt, bullets, onClick, productIndex, showBullets, src }) => {
  const renderBullets = () => {
    if (!showBullets) {
      return '';
    }
    const ret = [];
    bullets.forEach((b, i) => {
      if (productIndex >= 0) {
        if (b.product.index === productIndex) {
          ret.push(<button key={i} style={b.style} />);
        }
      } else {
        ret.push(<button key={i} style={b.style} onClick={b.onClick} />);
      }
    });
    return ret;
  };
  return (
    <div className="main-image">
      <a tabIndex="0" onClick={onClick}>
        <img alt={alt} src={src} />
      </a>
      {renderBullets()}
    </div>
  );
};

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
  showBullets: PropTypes.bool.isRequired,
  productIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default MainImage;
