import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import { getMain } from 'common/actions';
import MainImage from 'components/MainImage';

const messages = defineMessages({
  title: {
    id: 'main.title',
    description: 'Title in the main page',
    defaultMessage: 'Mobile Test',
  },
});

class App extends Component {
  componentDidMount() {
    this.props.getMain();
  }

  render() {
    const { intl, main } = this.props;
    const src = (main.images && main.images.length && main.images[0].url) || '';
    const bullets = (main.bullets || []).map(b => ({
      style: b.style,
      onClick: () => console.log(b.product), // eslint-disable-line no-console
    }));
    return (
      <div>
        <h1>{intl.formatMessage(messages.title)}</h1>
        <MainImage src={src} bullets={bullets} />
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
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
  getMain: PropTypes.func.isRequired,
};

export default connect(
  state => ({ main: state.main }),
  { getMain },
)(injectIntl(App));
