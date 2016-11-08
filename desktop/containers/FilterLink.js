import { connect } from 'react-redux';

import { setVisibilityFilter } from 'actions';
import Link from 'components/Link';

export default connect(
  (state, ownProps) => ({ active: ownProps.filter === state.visibilityFilter }),
  (dispatch, ownProps) =>
    ({ onClick: () => dispatch(setVisibilityFilter(ownProps.filter)) }),
)(Link);
