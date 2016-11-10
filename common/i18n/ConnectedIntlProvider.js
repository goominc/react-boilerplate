import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

// These messages are loaded from either mobile or desktop by webpack.
import messages from 'messages';

if ('ReactIntlLocaleData' in window) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default connect(
  state => ({ locale: state.locale, messages: messages[state.locale] }),
)(IntlProvider);
