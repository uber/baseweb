// @flow
import * as React from 'react';
import {StatefulMenu} from 'baseui/menu';

export default () => {
  return (
    <StatefulMenu
      items={[
        {label: 'www.example.com', href: '//www.example.com'},
        {label: 'www.example.net', href: '//www.example.net'},
        {label: 'www.example.org', href: '//www.example.org'},
      ]}
    />
  );
};
