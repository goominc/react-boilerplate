import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { getMain, toggleShowingBullets, toggleSelectingBullet } from 'common/actions';
import MainImage from 'components/MainImage';
import Headline from 'components/Headline';
import Product from 'components/Product';

class App extends Component {
  componentDidMount() {
    this.props.getMain();
  }

  render() {
    const { main, ui } = this.props;
    if (!main.products) {
      return <div>Loading...</div>;
    }
    const src = main.images[0].url;
    const bullets = main.bullets.map(b => ({
      ...b,
      onClick: () => this.props.toggleSelectingBullet(b.product.index),
    }));
    const products = main.products.map((p, i) => ({
      ...p,
      onClick: () => this.props.toggleSelectingBullet(i),
    }));
    const onClick = this.props.toggleShowingBullets;
    return (
      <div>
        <MainImage
          alt={main.title}
          bullets={bullets}
          onClick={onClick}
          productIndex={ui.productIndex}
          showBullets={ui.bullet}
          src={src}
        />
        <Headline
          onClick={onClick}
          productIndex={ui.productIndex}
          products={products}
          showTitles={ui.bullet}
        />
        <Product productIndex={ui.productIndex} products={products} />
        <div className="description">{main.description}</div>
      </div>
    );
  }
}

App.propTypes = {
  main: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })),
    bullets: PropTypes.arrayOf(PropTypes.shape({
      style: PropTypes.shape({
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
      }).isRequired,
      product: PropTypes.shape({
        index: PropTypes.number.isRequired,
      }).isRequired,
    })),
    products: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    })),
  }),
  ui: PropTypes.shape({
    bullet: PropTypes.bool.isRequired,
    productIndex: PropTypes.number,
  }),
  getMain: PropTypes.func.isRequired,
  toggleShowingBullets: PropTypes.func.isRequired,
  toggleSelectingBullet: PropTypes.func.isRequired,
};

export default connect(
  state => ({ main: state.main, ui: state.ui }),
  { getMain, toggleShowingBullets, toggleSelectingBullet },
)(injectIntl(App));
