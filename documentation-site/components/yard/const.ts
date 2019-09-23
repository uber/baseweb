export enum Action {
  Update,
  UpdateCode,
  UpdatePropsAndCodeNoRecompile,
  UpdatePropsAndCode,
  UpdateThemeAndCode,
  Reset,
}

export enum PropTypes {
  String = 'string',
  ReactNode = 'react node',
  Boolean = 'boolean',
  Number = 'number',
  Enum = 'enum',
  Array = 'array',
  Object = 'object',
  Function = 'function',
  Overrides = 'overrides',
  Ref = 'ref',
}
