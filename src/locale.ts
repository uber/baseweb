interface AccordionLocale {
  collapse: string;
  expand: string;
}

interface BreadcrumbLocale {
  ariaLabel: string;
}

interface DatepickerLocale {
  ariaLabel: string;
  ariaLabelRange: string;
  ariaLabelCalendar: string;
  ariaRoleDescriptionCalendarMonth: string;
  nextMonth: string;
  previousMonth: string;
  pastWeek: string;
  pastMonth: string;
  pastThreeMonths: string;
  pastSixMonths: string;
  pastYear: string;
  pastTwoYears: string;
  screenReaderMessageInput: string;
  selectedDate: string;
  selectedDateRange: string;
  selectSecondDatePrompt: string;
  quickSelectLabel: string;
  quickSelectAriaLabel: string;
  quickSelectPlaceholder: string;
  timeSelectEndLabel: string;
  timeSelectStartLabel: string;
  timePickerAriaLabel?: string;
  timePickerAriaLabel12Hour: string;
  timePickerAriaLabel24Hour: string;
  timezonePickerAriaLabel: string;
  selectedStartDateLabel: string;
  selectedEndDateLabel: string;
  dateNotAvailableLabel: string;
  dateAvailableLabel: string;
  selectedLabel: string;
  chooseLabel: string;
}

interface DataTableLocale {
  emptyState: string;
  loadingState: string;
}

interface ButtonGroupLocale {
  ariaLabel: string;
}

interface FileUploaderLocale {
  dropFilesToUpload: string;
  or: string;
  browseFiles: string;
  retry: string;
  cancel: string;
}

interface MenuLocale {
  noResultsMsg: string;
  parentMenuItemAriaLabel: string;
}

interface ModalLocale {
  close: string;
}

interface DrawerLocale {
  close: string;
}

interface PaginationLocale {
  prev: string;
  next: string;
  preposition: string;
}

interface SelectLocale {
  // Remove noResultsMsg prop in the next major version
  noResultsMsg: string;
  placeholder: string;
  create: string;
}

interface ToastLocale {
  close: string;
}

export interface Locale {
  accordion: AccordionLocale;
  breadcrumbs: BreadcrumbLocale;
  datepicker: DatepickerLocale;
  datatable: DataTableLocale;
  buttongroup: ButtonGroupLocale;
  fileuploader: FileUploaderLocale;
  menu: MenuLocale;
  modal: ModalLocale;
  drawer: DrawerLocale;
  pagination: PaginationLocale;
  select: SelectLocale;
  toast: ToastLocale;
}
