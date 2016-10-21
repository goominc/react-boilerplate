import { connect } from 'react-redux';

import { setLocale } from 'actions';
import Link from 'components/Link';

export default connect(
  (state, ownProps) => ({ active: ownProps.locale === state.locale }),
  (dispatch, ownProps) =>
    ({ onClick: () => dispatch(setLocale(ownProps.locale)) }),
)(Link);
