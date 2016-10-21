import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

import messages from 'common/i18n/messages';

if ('ReactIntlLocaleData' in window) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

function mapStateToProps(state) {
  const locale = state.locale;
  return { locale, messages: messages[locale] };
}

export default connect(mapStateToProps)(IntlProvider);
