/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Locale } from './types';

const es_AR: Locale = {
  accordion: {
    collapse: 'Colapsar',
    expand: 'Expandir',
  },

  breadcrumbs: {
    ariaLabel: 'Navegación',
  },

  datepicker: {
    ariaLabel: 'Selecciona una fecha.',
    ariaLabelRange: 'Selecciona un rango de fechas.',
    ariaLabelCalendar: 'Calendario.',
    ariaRoleDescriptionCalendarMonth: 'Mes calendario',
    previousMonth: 'Mes pasado.',
    nextMonth: 'Siguiente mes.',
    pastWeek: 'Semana pasada',
    pastMonth: 'Mes pasado',
    pastThreeMonths: 'Últimos 3 meses',
    pastSixMonths: 'Últimos 6 meses',
    pastYear: 'Año pasado',
    pastTwoYears: 'Últimos 2 años',
    screenReaderMessageInput:
      'Presione la tecla de flecha hacia abajo para interactuar con el calendario y seleccione una fecha. Presione el botón de escape para cerrar el calendario.',
    selectedDate: 'La fecha seleccionada es ${date}.',
    selectedDateRange: 'El rango de fecha seleccionado es desde ${startDate} hasta ${endDate}.',
    selectSecondDatePrompt: 'Selecciona la segunda fecha.',
    quickSelectLabel: 'Selecciona un rango de fechas.',
    quickSelectAriaLabel: 'Selecciona un rango de fechas.',
    quickSelectPlaceholder: 'Ninguno',
    timeSelectEndLabel: 'Tiempo de finalización',
    timeSelectStartLabel: 'Tiempo de inicio',
    timePickerAriaLabel12Hour: 'Selecciona una hora, formato 12 horas.',
    timePickerAriaLabel24Hour: 'Selecciona una hora, formato 24 horas.',
    timezonePickerAriaLabel: 'Selecciona una zona horaria.',
    selectedStartDateLabel: 'Fecha de inicio seleccionada.',
    selectedEndDateLabel: 'Fecha de finalización seleccionada.',
    dateNotAvailableLabel: 'No disponible.',
    dateAvailableLabel: 'Está disponible.',
    selectedLabel: 'Seleccionada.',
    chooseLabel: 'Elegir',
  },

  datatable: {
    emptyState:
      'Ninguna fila coincide con los criterios de filtro definidos. Elimine uno o más filtros para ver más datos.',
    loadingState: 'Cargando filas.',
    searchAriaLabel: 'Buscar por texto',
    filterAdd: 'Añadir filtro',
    filterExclude: 'Excluir',
    filterApply: 'Aplicar',
    filterExcludeRange: 'Excluir rango',
    filterExcludeValue: 'Excluir valor',
    filterAppliedTo: 'filtro aplicado a',
    optionsLabel: 'Selecciona una columna para filtrar',
    optionsSearch: 'Busque una columna para filtrar por...',
    optionsEmpty: 'Sin columnas disponibles.',
    categoricalFilterSelectAll: 'Seleccionar Todo',
    categoricalFilterSelectClear: 'Borrar',
    categoricalFilterEmpty: 'No se encontraron categorías',
    datetimeFilterRange: 'Rango',
    datetimeFilterRangeDatetime: 'Fecha, Hora',
    datetimeFilterRangeDate: 'Fecha',
    datetimeFilterRangeTime: 'Hora',
    datetimeFilterCategorical: 'Categórica',
    datetimeFilterCategoricalWeekday: 'Día de la semana',
    datetimeFilterCategoricalMonth: 'Mes',
    datetimeFilterCategoricalQuarter: 'Trimestre',
    datetimeFilterCategoricalHalf: 'Mitad',
    datetimeFilterCategoricalFirstHalf: 'H1',
    datetimeFilterCategoricalSecondHalf: 'H2',
    datetimeFilterCategoricalYear: 'Año',
    numericalFilterRange: 'Rango',
    numericalFilterSingleValue: 'Un solo valor',
    booleanFilterTrue: 'verdadero',
    booleanFilterFalse: 'falso',
    booleanColumnTrueShort: 'V',
    booleanColumnFalseShort: 'F',
  },

  buttongroup: {
    ariaLabel: 'grupo de botones',
  },

  fileuploader: {
    dropFilesToUpload: 'Arrastra archivos aquí para subir...',
    or: '',
    browseFiles: 'Buscar archivos',
    retry: 'Reintentar',
    cancel: 'Cancelar',
  },

  menu: {
    noResultsMsg: 'Sin resultados',
    parentMenuItemAriaLabel:
      'Actualmente se encuentra en un elemento que abre un cuadro de lista anidado. Presione la flecha derecha para ingresar a ese elemento y la flecha izquierda para regresar.',
  },

  modal: {
    close: 'Cerrar',
  },

  drawer: {
    close: 'Cerrar',
  },

  pagination: {
    prev: 'Anterior',
    next: 'Siguiente',
    preposition: 'de',
  },

  select: {
    noResultsMsg: 'Sin resultados',
    placeholder: 'Seleccionar...',
    create: 'Crear',
  },

  toast: {
    close: 'Cerrar',
  },
};
export default es_AR;
