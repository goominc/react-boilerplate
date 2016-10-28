import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { getMain, toggleBullet } from 'common/actions';
import MainImage from 'components/MainImage';
import Headline from 'components/Headline';

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
      onClick: () => console.log(b), // eslint-disable-line no-console
    }));
    const products = main.products.map(p => ({
      ...p,
      onClick: () => console.log(p), // eslint-disable-line no-console
    }));
    const onClick = this.props.toggleBullet;
    return (
      <div>
        <MainImage
          alt={main.title}
          src={src}
          bullets={bullets}
          showBullets={ui.bullet}
          onClick={onClick}
        />
        <Headline products={products} showTitles={ui.bullet} onClick={onClick} />
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
      url: PropTypes.string.isRequired,
    })),
  }),
  ui: PropTypes.shape({
    bullet: PropTypes.bool.isRequired,
  }),
  getMain: PropTypes.func.isRequired,
  toggleBullet: PropTypes.func.isRequired,
};

export default connect(
  state => ({ main: state.main, ui: state.ui }),
  { getMain, toggleBullet },
)(injectIntl(App));
