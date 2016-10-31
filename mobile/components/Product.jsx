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
