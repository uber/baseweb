/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {AccordionLocaleT} from '../accordion/locale.js';
import type {BreadcrumbLocaleT} from '../breadcrumbs/locale.js';
import type {DatepickerLocaleT} from '../datepicker/locale.js';
import type {ButtonGroupLocaleT} from '../button-group/locale.js';
import type {FileUploaderLocaleT} from '../file-uploader/locale.js';

export type LocaleT = {|
  accordion: AccordionLocaleT,
  breadcrumbs: BreadcrumbLocaleT,
  datepicker: DatepickerLocaleT,
  buttongroup: ButtonGroupLocaleT,
  fileuploader: FileUploaderLocaleT,
|};
