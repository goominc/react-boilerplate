import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import MainImage from 'components/MainImage';

const messages = defineMessages({
  title: {
    id: 'main.title',
    description: 'Title in the main page',
    defaultMessage: 'Mobile Test',
  },
});

const App = ({ intl, main }) => {
  const mainImage = main ? (<MainImage src={main.imageUrl} bullets={main.bullets} />) : '';
  return (
    <div>
      <h1>{intl.formatMessage(messages.title)}</h1>
      {mainImage}
    </div>
  );
};


App.propTypes = {
  intl: intlShape.isRequired,
  main: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    bullets: PropTypes.arrayOf(PropTypes.shape({
      left: PropTypes.string.isRequired,
      top: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })),
  }),
};

export default connect()(injectIntl(App));
