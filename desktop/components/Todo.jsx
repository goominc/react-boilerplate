import PropTypes from 'prop-types';
import React from 'react';

const Todo = ({
  tabIndex, onClick, completed, text,
}) => (
  <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    <a tabIndex={tabIndex} onClick={onClick} role="link">
      {text}
    </a>
  </li>
);

Todo.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
