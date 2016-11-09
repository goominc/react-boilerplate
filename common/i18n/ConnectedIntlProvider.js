import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import ko from 'react-intl/locale-data/ko';

import messages from 'common/i18n/translated';

addLocaleData(ko);

function mapStateToProps(state) {
  const locale = state.locale;
  return { locale, messages: messages[locale] };
}

export default connect(mapStateToProps)(IntlProvider);
