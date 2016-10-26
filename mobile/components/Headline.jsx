import React, { PropTypes } from 'react';

const Headline = ({ products, showTitles, onClick }) => {
  const open = showTitles ? 'open' : '';
  const titles = showTitles ?
    products.map((p, i) => <button key={i} onClick={p.onClick}>{p.title}</button>) : '';
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
      <span>{products.length}</span>
      {titles}
    </div>
  );
};

Headline.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
  showTitles: PropTypes.bool.isRequired,
};

export default Headline;
