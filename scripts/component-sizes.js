#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

main().catch(console.error);

async function main() {
  const original = require('../component-sizes.json');

  const componentExports = {
    accordion: ['Accordion', 'Panel'],
    avatar: 'Avatar',
    block: 'Block',
    breadcrumbs: 'Breadcrumbs',
    'button-group': 'ButtonGroup',
    button: 'Button',
    card: 'Card',
    checkbox: 'Checkbox',
    'data-table': 'Unstable_StatefulDataTable',
    datepicker: 'Datepicker',
    'dnd-list': 'List',
    drawer: 'Drawer',
    'file-uploader': 'FileUploader',
    'flex-grid': 'FlexGrid',
    'form-control': 'FormControl',
    'header-navigation': 'HeaderNavigation',
    heading: 'Heading',
    icon: 'Icon',
    input: 'Input',
    layer: 'Layer',
    list: 'ListItem',
    menu: 'StatefulMenu',
    modal: 'Modal',
    notification: 'Notification',
    pagination: 'Pagination',
    'payment-card': 'PaymentCard',
    'phone-input': 'PhoneInput',
    'pin-code': 'PinCode',
    popover: 'Popover',
    'progress-bar': 'ProgressBar',
    'progress-steps': 'ProgressSteps',
    radio: 'RadioGroup',
    rating: 'Rating',
    select: 'Select',
    'side-navigation': 'Navigation',
    slider: 'Slider',
    spinner: 'Spinner',
    'table-grid': ['StyledTable', 'StyledHeadCell', 'StyledBodyCell'],
    'table-semantic': 'Unstable_Table',
    table: 'Table',
    tabs: ['Tabs', 'Tab'],
    tag: 'Tag',
    textarea: 'Textarea',
    toast: ['toaster', 'ToasterContainer'],
    tooltip: 'Tooltip',
    'tree-view': 'Unstable_StatefulTreeView',
    typography: ['Display1', 'Label1'],
  };
  const components = Object.keys(componentExports);
  const data = {};

  for (let i = 0; i < components.length; i += 1) {
    data[components[i]] = getStatsForComponent(
      components[i],
      componentExports[components[i]],
    );
  }

  if (process.env.FORCE_UPDATE) {
    const filePath = path.join(__dirname, '../component-sizes.json');

    fs.unlinkSync(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } else {
    compare(original, data);
  }
}

function getStatsForComponent(componentName, exportName) {
  const stats = childProcess.execSync(
    `${path.resolve(
      __dirname,
      './bundle-size/bundle-size.js',
    )} -c ${componentName} -e ${exportName}`,
  );
  return JSON.parse(stats.toString())[0];
}

function compare(original, current) {
  const components = Object.keys(current);

  for (let i = 0; i < components.length; i += 1) {
    const originalSize = original[components[i]].gzip;
    const currentSize = current[components[i]].gzip;

    console.log(
      `Size of ${components[i]}: ${currentSize} bytes. On master, it is ${originalSize} bytes`,
    );

    const ratio = currentSize / originalSize;
    if (ratio > 1.1 || ratio < 0.9) {
      console.error(`This size of ${components[i]} changed signifcantly`);
      console.error(
        'If this is expected, rerun this command with the environment variable FORCE_UPDATE=true',
      );
      process.exit(-1);
    }
  }
}
