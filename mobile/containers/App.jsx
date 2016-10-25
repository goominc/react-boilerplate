import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  title: {
    id: 'main.title',
    description: 'Title in the main page',
    defaultMessage: 'Mobile Test',
  },
});

const App = ({ intl }) => (
  <h1>{intl.formatMessage(messages.title)}</h1>
);


App.propTypes = {
  intl: intlShape.isRequired,
};

export default connect()(injectIntl(App));
