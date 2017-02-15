import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  addToCart: {
    id: 'product.addToCart',
    defaultMessage: 'ADD TO CART',
  },
});

const Product = ({ cart, intl, productIndex, products, updateQuantity }) => {
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
          <button className="add-to-cart">{intl.formatMessage(messages.addToCart)}</button>
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
          {p.description.split('\n').map((d, i) => {
            const key = `desc_${i}`;
            return <p key={key}>{d}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

Product.defaultProps = {
  productIndex: undefined,
};

Product.propTypes = {
  cart: PropTypes.shape({
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })),
  }).isRequired,
  intl: intlShape.isRequired,
  productIndex: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default injectIntl(Product);
