import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

import messages from 'common/i18n/messages';

addLocaleData(en);
addLocaleData(ko);

function mapStateToProps(state) {
  const locale = state.locale || 'ko';
  return { locale, messages: messages[locale] };
}

export default connect(mapStateToProps)(IntlProvider);
