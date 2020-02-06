import * as React from 'react';
import {LocaleProvider} from 'spaceweb';
import {StatefulPagination} from 'spaceweb/pagination';

const localeOverrideHu = {
  pagination: {
    next: 'Következő',
    prev: 'Előző',
    preposition: ' ',
  },
};

export default () => (
  <LocaleProvider locale={localeOverrideHu}>
    <StatefulPagination numPages={10} />
  </LocaleProvider>
);
