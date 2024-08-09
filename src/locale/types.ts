/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { AccordionLocale } from '../accordion';
import type { BreadcrumbLocale } from '../breadcrumbs';
import type { DatepickerLocale } from '../datepicker';
import type { DataTableLocale } from '../data-table';
import type { ButtonGroupLocale } from '../button-group';
import type { FileUploaderLocale } from '../file-uploader';
import type { FileUploaderBasicLocale } from '../file-uploader-basic';
import type { MenuLocale } from '../menu';
import type { ModalLocale } from '../modal';
import type { DrawerLocale } from '../drawer';
import type { PaginationLocale } from '../pagination';
import type { SelectLocale } from '../select';
import type { ToastLocale } from '../toast';

export type Locale = {
  accordion: AccordionLocale;
  breadcrumbs: BreadcrumbLocale;
  datepicker: DatepickerLocale;
  datatable: DataTableLocale;
  buttongroup: ButtonGroupLocale;
  fileuploader: FileUploaderLocale;
  fileuploaderbasic: FileUploaderBasicLocale;
  menu: MenuLocale;
  modal: ModalLocale;
  drawer: DrawerLocale;
  pagination: PaginationLocale;
  select: SelectLocale;
  toast: ToastLocale;
};
