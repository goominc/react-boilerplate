import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const FilterLink = connect(
  (state, ownProps) => ({ active: ownProps.filter === state.visibilityFilter }),
  (dispatch, ownProps) =>
    ({ onClick: () => dispatch(setVisibilityFilter(ownProps.filter)) })
)(Link);

export default FilterLink;
