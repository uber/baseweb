/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { AccordionLocaleT } from '../accordion';
import type { BreadcrumbLocaleT } from '../breadcrumbs';
import type { DatepickerLocaleT } from '../datepicker';
import type { DataTableLocaleT } from '../data-table';
import type { ButtonGroupLocaleT } from '../button-group';
import type { FileUploaderLocaleT } from '../file-uploader';
import type { MenuLocaleT } from '../menu';
import type { ModalLocaleT } from '../modal';
import type { DrawerLocaleT } from '../drawer';
import type { PaginationLocaleT } from '../pagination';
import type { SelectLocaleT } from '../select';
import type { ToastLocaleT } from '../toast';

export type LocaleT = {
  accordion: AccordionLocaleT;
  breadcrumbs: BreadcrumbLocaleT;
  datepicker: DatepickerLocaleT;
  datatable: DataTableLocaleT;
  buttongroup: ButtonGroupLocaleT;
  fileuploader: FileUploaderLocaleT;
  menu: MenuLocaleT;
  modal: ModalLocaleT;
  drawer: DrawerLocaleT;
  pagination: PaginationLocaleT;
  select: SelectLocaleT;
  toast: ToastLocaleT;
};
