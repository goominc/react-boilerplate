import React from 'react';

import FilterLink from 'containers/FilterLink';
import LocaleLink from 'containers/LocaleLink';

const Footer = () => (
  <div>
    <div>
      Show:
      {' '}
      <FilterLink filter="SHOW_ALL">
        All
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_COMPLETED">
        Completed
      </FilterLink>
    </div>
    <div>
      <LocaleLink locale="en">
        en
      </LocaleLink>
      {', '}
      <LocaleLink locale="ko">
        ko
      </LocaleLink>
    </div>
  </div>
);

export default Footer;
