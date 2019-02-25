/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {AccordionLocaleT} from '../accordion/locale.js';
import type {BreadcrumbLocaleT} from '../breadcrumb/locale.js';
import type {DatepickerLocaleT} from '../datepicker/locale.js';

export type LocaleT = {|
  accordion: AccordionLocaleT,
  breadcrumbs: BreadcrumbLocaleT,
  datepicker: DatepickerLocaleT,
|};
