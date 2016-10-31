import React, { PropTypes } from 'react';

const Product = ({ productIndex, products }) => {
  if (productIndex === undefined) {
    return null;
  }
  const p = products[productIndex];
  return (
    <div className="product">
      <div className="carousel">
        <img alt={p.title} src={p.image.url} />
      </div>
      <div className="container">
        <div className="actions">
          <button className="add-to-cart">ADD TO CART</button>
          <button className="buy-now">BUY NOW</button>
          <button className="wish-list">WISH LIST</button>
        </div>
        <div className="description">{p.description.split('\n').map(d => <p>{d}</p>)}</div>
      </div>
    </div>
  );
};

Product.propTypes = {
  productIndex: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
};

export default Product;
