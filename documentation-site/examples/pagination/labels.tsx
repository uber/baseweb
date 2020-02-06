import * as React from 'react';
import {StatefulPagination} from 'spaceweb/pagination';

export default () => (
  <StatefulPagination
    numPages={10}
    labels={{
      prevButton: 'Back',
      nextButton: 'Forward',
      preposition: 'out of',
    }}
  />
);
