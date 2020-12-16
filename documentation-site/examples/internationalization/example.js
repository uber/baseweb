// @flow
import * as React from 'react';
import {LocaleProvider} from 'baseui';
import {StatefulPagination} from 'baseui/pagination';

const localeOverrideHu = {
  pagination: {
    next: 'Következő',
    prev: 'Előző',
    preposition: ' ',
  },
};

export default function Example() {
  return (
    <LocaleProvider locale={localeOverrideHu}>
      <StatefulPagination numPages={10} />
    </LocaleProvider>
  );
}
