// @flow
import * as React from 'react';
import {StatefulMenu} from 'baseui/menu';

export default function Example() {
  return (
    <StatefulMenu
      items={[
        {label: 'Apple', href: '//www.example.com/apple'},
        {label: 'Orange', href: '//www.example.com/orange'},
        {label: 'Strawberry', href: '//www.example.com/strawberry'},
      ]}
    />
  );
}
