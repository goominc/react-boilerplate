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
    const { main: { images = [], bullets = [] }, ui } = this.props;
    const src = (images.length && images[0].url) || '';
    const params = { bullets: [], products: [] };
    bullets.forEach((b) => {
      params.bullets.push({
        style: b.style,
        onClick: () => console.log(b.product), // eslint-disable-line no-console
      });
      params.products.push({
        title: b.product.title,
        onClick: () => console.log(b.product), // eslint-disable-line no-console
      });
    });
    const onClick = this.props.toggleBullet;
    return (
      <div>
        <MainImage src={src} bullets={params.bullets} showBullets={ui.bullet} onClick={onClick} />
        <Headline products={params.products} showTitles={ui.bullet} onClick={onClick} />
      </div>
    );
  }
}

App.propTypes = {
  main: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })),
    bullets: PropTypes.arrayOf(PropTypes.shape({
      style: PropTypes.shape({
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
      }),
      product: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
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
