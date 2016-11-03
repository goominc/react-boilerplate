import React, { PropTypes } from 'react';

const Product = ({ cart, productIndex, products, updateQuantity }) => {
  if (productIndex === undefined) {
    return null;
  }
  const p = products[productIndex];

  let quantity = 1;
  if (cart && cart.variants) {
    cart.variants.forEach((v) => {
      if (v.id === productIndex) {
        quantity = v.quantity;
      }
    });
  }

  const increaseQuantity = () => updateQuantity(productIndex, quantity + 1);
  const decreaseQuantity = () => quantity > 1 && updateQuantity(productIndex, quantity - 1);
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
        <div className="variants">
          <div className="quantity">
            수량<span>{quantity}</span>
          </div>
          <button onClick={increaseQuantity}>+</button>
          <button onClick={decreaseQuantity}>-</button>
        </div>
        <div className="tabs">
          <button className="selected">Detail</button>
          <button>Spec</button>
          <button>Ingredient</button>
          <button>Review</button>
        </div>
        <div className="description">
          {p.description.split('\n').map((d, i) => <p key={i}>{d}</p>)}
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  cart: PropTypes.shape({
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })),
  }),
  productIndex: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
  updateQuantity: PropTypes.func,
};

export default Product;
