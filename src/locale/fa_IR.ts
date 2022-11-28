/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Locale } from './types';

const fa_IR: Locale = {
  accordion: {
    collapse: 'بستن',
    expand: 'بازکردن',
  },

  breadcrumbs: {
    ariaLabel: 'مسیریابی وبسایت',
  },

  datepicker: {
    ariaLabel: 'تاریخ را انتخاب کنید',
    ariaLabelRange: 'بازه زمانی را انتخاب کنید',
    ariaLabelCalendar: 'تقویم',
    ariaRoleDescriptionCalendarMonth: 'ماه',
    previousMonth: 'ماه قبلی',
    nextMonth: 'ماه بعدی',
    pastWeek: 'هفته گذشته',
    pastMonth: 'ماه گذشته',
    pastThreeMonths: '۳ ماه قبل',
    pastSixMonths: '۶ ماه قبل',
    pastYear: 'سال گذشته',
    pastTwoYears: '۲ سال قبل',
    screenReaderMessageInput:
      'کلید جهت پایین را برای انتخاب تاریخ فشار دهید. برای بستن تقویم، اسکیپ را فشار دهید.',
    selectedDate: 'تاریخ انتخاب‌شده: ${date}',
    selectedDateRange: 'باز زمانی انتخاب‌شده از ${startDate} تا ${endDate}.',
    selectSecondDatePrompt: 'تاریخ دوم را انتخاب کنید.',
    quickSelectLabel: 'یک بازه زمانی انتخب کنید',
    quickSelectAriaLabel: 'یک بازه زمانی انتخب کنید',
    quickSelectPlaceholder: 'هیچکدام',
    timeSelectEndLabel: 'زمان پایان',
    timeSelectStartLabel: 'زمان شروع',
    timePickerAriaLabel12Hour: 'زمان را انتخاب کنید در فرمت ۱۲ ساعته',
    timePickerAriaLabel24Hour: 'زمان را انتخاب کنید در فرمت ۲۴ ساعته',
    timezonePickerAriaLabel: 'موقعیت زمانی',
    selectedStartDateLabel: 'تاریخ شروع انتخابی',
    selectedEndDateLabel: 'تاریخ پایان انتخابی',
    dateNotAvailableLabel: 'امکان‌پذیر نیست.',
    dateAvailableLabel: 'امکان‌پذیر است',
    selectedLabel: 'انتخاب‌شده',
    chooseLabel: 'انتخاب کنید',
  },

  datatable: {
    emptyState:
      'داده موردنظر یافت نشد. لطفاً یک یا چند فیلتر را حذف کرده تا داده‌ها نمایش داده‌شوند.',
    loadingState: 'ردیف‌های درحال آماده‌سازی',
    searchAriaLabel: 'جستجو با متن',
    filterAdd: 'فیلتر',
    filterExclude: 'درنظر نگرفتن',
    filterApply: 'تایید',
    filterExcludeRange: 'درنظر نگرفتن بازه',
    filterExcludeValue: 'درنظر نگرفتن مقدار',
    filterAppliedTo: 'فیلتر اعمال‌شده',
    optionsLabel: 'یک ستون برای فیلتر انتخاب کنید',
    optionsSearch: 'عنوان ستونی را برای فیلتر جستجو کنید...',
    optionsEmpty: 'ستونی در دسترس نیست.',
    categoricalFilterSelectAll: 'انتخاب همه',
    categoricalFilterSelectClear: 'حذف',
    categoricalFilterEmpty: 'دسته‌بندی یافت نشد',
    datetimeFilterRange: 'بازه',
    datetimeFilterRangeDatetime: 'تاریخ، زمان',
    datetimeFilterRangeDate: 'تاریخ',
    datetimeFilterRangeTime: 'زمان',
    datetimeFilterCategorical: 'طبقه بندی شده',
    datetimeFilterCategoricalWeekday: 'روز هفته',
    datetimeFilterCategoricalMonth: 'ماه',
    datetimeFilterCategoricalQuarter: 'کوارتر',
    datetimeFilterCategoricalHalf: 'نیمه',
    datetimeFilterCategoricalFirstHalf: 'نیمه اول',
    datetimeFilterCategoricalSecondHalf: 'نیمه دوم',
    datetimeFilterCategoricalYear: 'سال',
    numericalFilterRange: 'بازه',
    numericalFilterSingleValue: 'تک مقدار',
    booleanFilterTrue: 'صحیح',
    booleanFilterFalse: 'غلط',
    booleanColumnTrueShort: 'ص',
    booleanColumnFalseShort: 'غ',
    selectRow: 'انتخب ردیف',
    selectAllRows: 'انتخاب همه ردیف‌ها',
  },

  buttongroup: {
    ariaLabel: 'گروه دکمه',
  },

  fileuploader: {
    dropFilesToUpload: 'فایل‌ها را برای آپلود بگذارید...',
    or: '',
    browseFiles: 'انتخاب فایل',
    retry: 'آپلود مجدد',
    cancel: 'انصراف',
  },

  menu: {
    noResultsMsg: 'بدون نتیجه',
    parentMenuItemAriaLabel:
      'شما در آیتمی قرار دارید که شامل لیستی از موارد است. کلید فلش راست را برای بازکردن لیست و فلش چپ را برای بستن فشار دهید.',
  },

  modal: {
    close: 'بستن',
  },

  drawer: {
    close: 'بستن',
  },

  pagination: {
    prev: 'قبلی',
    next: 'بعدی',
    preposition: 'از',
  },

  select: {
    noResultsMsg: 'نتیجه‌ای بافت نشد',
    placeholder: 'انتخاب...',
    create: 'ایجادکردن',
  },

  toast: {
    close: 'بستن',
  },
};
export default fa_IR;
