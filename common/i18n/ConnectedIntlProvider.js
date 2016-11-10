import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import ko from 'react-intl/locale-data/ko';

// These messages are loaded from either mobile or desktop by webpack.
import messages from 'messages';

addLocaleData(ko);

export default connect(
  state => ({ locale: state.locale, messages: messages[state.locale] }),
)(IntlProvider);
