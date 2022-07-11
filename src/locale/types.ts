/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { AccordionLocaleT } from '../accordion/locale';
import type { BreadcrumbLocaleT } from '../breadcrumbs/locale';
import type { DatepickerLocaleT } from '../datepicker/locale';
import type { DataTableLocaleT } from '../data-table/locale';
import type { ButtonGroupLocaleT } from '../button-group/locale';
import type { FileUploaderLocaleT } from '../file-uploader/locale';
import type { MenuLocaleT } from '../menu/locale';
import type { ModalLocaleT } from '../modal/locale';
import type { DrawerLocaleT } from '../drawer/locale';
import type { PaginationLocaleT } from '../pagination/locale';
import type { SelectLocaleT } from '../select/locale';
import type { ToastLocaleT } from '../toast/locale';

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
