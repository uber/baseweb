import React from 'react';
import {IconProvider} from 'baseui';
import {StatefulPagination} from 'baseui/pagination';

import {FaChevronLeft, FaChevronRight, FaSortDown} from 'react-icons/fa';

export default () => (
  <IconProvider
    icons={{
      TriangleDown: FaSortDown,
      ChevronLeft: FaChevronLeft,
      ChevronRight: FaChevronRight,
    }}
  >
    <StatefulPagination numPages={10} />
  </IconProvider>
);
