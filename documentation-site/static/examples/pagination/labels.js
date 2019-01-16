import React from 'react';
import {StatefulPagination} from 'baseui/pagination';

export default () => (
  <StatefulPagination
    numPages={10}
    labels={{prevButton: 'Back', nextButton: 'Forward', preposition: 'out of'}}
  />
);
