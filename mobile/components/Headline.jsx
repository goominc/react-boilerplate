import React, { PropTypes } from 'react';

const Headline = ({ productIndex, products, showTitles, onClick }) => {
  const open = showTitles ? 'open' : '';
  const renderTitles = () => {
    if (!showTitles) {
      return '';
    }
    return products.map((p, i) => {
      const selected = i === productIndex ? 'selected' : '';
      return <button className={selected} key={i} onClick={p.onClick}>{p.title}</button>;
    });
  };
  return (
    <div className="headline">
      <button onClick={onClick}>
        <div id="nav-icon2" className={open}>
          <span />
          <span />
          <span /> {/* icon1, icon 4 */}
          <span /> {/* icon3 */}
          <span />
          <span /> {/* icon2 */}
        </div>
      </button>
      {showTitles ? '' : <span>{products.length}</span>}
      {renderTitles()}
    </div>
  );
};

Headline.propTypes = {
  productIndex: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
  showTitles: PropTypes.bool.isRequired,
};

export default Headline;
