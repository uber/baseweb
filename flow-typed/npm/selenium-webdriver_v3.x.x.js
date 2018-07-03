// flow-typed signature: c724f53effab62d66cdfc30205566756
// flow-typed version: 98bc3c3e42/selenium-webdriver_v3.x.x/flow_>=v0.28.x

// @flow

//
//	ENUMS
//

type webdriver$ButtonEnum = {
  LEFT: number,
  MIDDLE: number,
  RIGHT: number
};

type webdriver$KeyEnum = {
  NULL: string,
  CANCEL: string, // ^break
  HELP: string,
  BACK_SPACE: string,
  TAB: string,
  CLEAR: string,
  RETURN: string,
  ENTER: string,
  SHIFT: string,
  CONTROL: string,
  ALT: string,
  PAUSE: string,
  ESCAPE: string,
  SPACE: string,
  PAGE_UP: string,
  PAGE_DOWN: string,
  END: string,
  HOME: string,
  ARROW_LEFT: string,
  LEFT: string,
  ARROW_UP: string,
  UP: string,
  ARROW_RIGHT: string,
  RIGHT: string,
  ARROW_DOWN: string,
  DOWN: string,
  INSERT: string,
  DELETE: string,
  SEMICOLON: string,
  EQUALS: string,
  NUMPAD0: string, // number pad keys
  NUMPAD1: string,
  NUMPAD2: string,
  NUMPAD3: string,
  NUMPAD4: string,
  NUMPAD5: string,
  NUMPAD6: string,
  NUMPAD7: string,
  NUMPAD8: string,
  NUMPAD9: string,
  MULTIPLY: string,
  ADD: string,
  SEPARATOR: string,
  SUBTRACT: string,
  DECIMAL: string,
  DIVIDE: string,
  F1: string, // function keys
  F2: string,
  F3: string,
  F4: string,
  F5: string,
  F6: string,
  F7: string,
  F8: string,
  F9: string,
  F10: string,
  F11: string,
  F12: string,
  COMMAND: string, // Apple command key
  META: string, // alias for Windows key
  chord: (...var_args: Array<string>) => string
};

type webdriver$BrowserEnum = {
  ANDROID: string,
  CHROME: string,
  FIREFOX: string,
  INTERNET_EXPLORER: string,
  IPAD: string,
  IPHONE: string,
  OPERA: string,
  PHANTOM_JS: string,
  SAFARI: string,
  HTMLUNIT: string
};

type webdriver$CapabilityEnum = {
  ACCEPT_SSL_CERTS: string,
  BROWSER_NAME: string,
  ELEMENT_SCROLL_BEHAVIOR: string,
  HANDLES_ALERTS: string,
  LOGGING_PREFS: string,
  NATIVE_EVENTS: string,
  PLATFORM: string,
  PROXY: string,
  ROTATABLE: string,
  SECURE_SSL: string,
  SUPPORTS_APPLICATION_CACHE: string,
  SUPPORTS_CSS_SELECTORS: string,
  SUPPORTS_JAVASCRIPT: string,
  SUPPORTS_LOCATION_CONTEXT: string,
  TAKES_SCREENSHOT: string,
  UNEXPECTED_ALERT_BEHAVIOR: string,
  VERSION: string
};

type webdriver$CommandNameEnum = {
  GET_SERVER_STATUS: string,
  NEW_SESSION: string,
  GET_SESSIONS: string,
  DESCRIBE_SESSION: string,
  CLOSE: string,
  QUIT: string,
  GET_CURRENT_URL: string,
  GET: string,
  GO_BACK: string,
  GO_FORWARD: string,
  REFRESH: string,
  ADD_COOKIE: string,
  GET_COOKIE: string,
  GET_ALL_COOKIES: string,
  DELETE_COOKIE: string,
  DELETE_ALL_COOKIES: string,
  GET_ACTIVE_ELEMENT: string,
  FIND_ELEMENT: string,
  FIND_ELEMENTS: string,
  FIND_CHILD_ELEMENT: string,
  FIND_CHILD_ELEMENTS: string,
  CLEAR_ELEMENT: string,
  CLICK_ELEMENT: string,
  SEND_KEYS_TO_ELEMENT: string,
  SUBMIT_ELEMENT: string,
  GET_CURRENT_WINDOW_HANDLE: string,
  GET_WINDOW_HANDLES: string,
  GET_WINDOW_POSITION: string,
  SET_WINDOW_POSITION: string,
  GET_WINDOW_SIZE: string,
  SET_WINDOW_SIZE: string,
  MAXIMIZE_WINDOW: string,
  SWITCH_TO_WINDOW: string,
  SWITCH_TO_FRAME: string,
  GET_PAGE_SOURCE: string,
  GET_TITLE: string,
  EXECUTE_SCRIPT: string,
  EXECUTE_ASYNC_SCRIPT: string,
  GET_ELEMENT_TEXT: string,
  GET_ELEMENT_TAG_NAME: string,
  IS_ELEMENT_SELECTED: string,
  IS_ELEMENT_ENABLED: string,
  IS_ELEMENT_DISPLAYED: string,
  GET_ELEMENT_LOCATION: string,
  GET_ELEMENT_LOCATION_IN_VIEW: string,
  GET_ELEMENT_SIZE: string,
  GET_ELEMENT_ATTRIBUTE: string,
  GET_ELEMENT_VALUE_OF_CSS_PROPERTY: string,
  ELEMENT_EQUALS: string,
  SCREENSHOT: string,
  IMPLICITLY_WAIT: string,
  SET_SCRIPT_TIMEOUT: string,
  SET_TIMEOUT: string,
  ACCEPT_ALERT: string,
  DISMISS_ALERT: string,
  GET_ALERT_TEXT: string,
  SET_ALERT_TEXT: string,
  EXECUTE_SQL: string,
  GET_LOCATION: string,
  SET_LOCATION: string,
  GET_APP_CACHE: string,
  GET_APP_CACHE_STATUS: string,
  CLEAR_APP_CACHE: string,
  IS_BROWSER_ONLINE: string,
  SET_BROWSER_ONLINE: string,
  GET_LOCAL_STORAGE_ITEM: string,
  GET_LOCAL_STORAGE_KEYS: string,
  SET_LOCAL_STORAGE_ITEM: string,
  REMOVE_LOCAL_STORAGE_ITEM: string,
  CLEAR_LOCAL_STORAGE: string,
  GET_LOCAL_STORAGE_SIZE: string,
  GET_SESSION_STORAGE_ITEM: string,
  GET_SESSION_STORAGE_KEYS: string,
  SET_SESSION_STORAGE_ITEM: string,
  REMOVE_SESSION_STORAGE_ITEM: string,
  CLEAR_SESSION_STORAGE: string,
  GET_SESSION_STORAGE_SIZE: string,
  SET_SCREEN_ORIENTATION: string,
  GET_SCREEN_ORIENTATION: string,
  CLICK: string,
  DOUBLE_CLICK: string,
  MOUSE_DOWN: string,
  MOUSE_UP: string,
  MOVE_TO: string,
  SEND_KEYS_TO_ACTIVE_ELEMENT: string,
  TOUCH_SINGLE_TAP: string,
  TOUCH_DOWN: string,
  TOUCH_UP: string,
  TOUCH_MOVE: string,
  TOUCH_SCROLL: string,
  TOUCH_DOUBLE_TAP: string,
  TOUCH_LONG_PRESS: string,
  TOUCH_FLICK: string,
  GET_AVAILABLE_LOG_TYPES: string,
  GET_LOG: string,
  GET_SESSION_LOGS: string
};

declare type webdriver$LoggingTypeEnum = {
  BROWSER: string,
  CLIENT: string,
  DRIVER: string,
  PERFORMANCE: string,
  SERVER: string
};

declare type webdriver$ErrorCodeEnum = {
  SUCCESS: number,
  NO_SUCH_ELEMENT: number,
  NO_SUCH_FRAME: number,
  UNKNOWN_COMMAND: number,
  UNSUPPORTED_OPERATION: number, // Alias for UNKNOWN_COMMAND.
  STALE_ELEMENT_REFERENCE: number,
  ELEMENT_NOT_VISIBLE: number,
  INVALID_ELEMENT_STATE: number,
  UNKNOWN_ERROR: number,
  ELEMENT_NOT_SELECTABLE: number,
  JAVASCRIPT_ERROR: number,
  XPATH_LOOKUP_ERROR: number,
  TIMEOUT: number,
  NO_SUCH_WINDOW: number,
  INVALID_COOKIE_DOMAIN: number,
  UNABLE_TO_SET_COOKIE: number,
  MODAL_DIALOG_OPENED: number,
  UNEXPECTED_ALERT_OPEN: number,
  NO_SUCH_ALERT: number,
  NO_MODAL_DIALOG_OPEN: number,
  SCRIPT_TIMEOUT: number,
  INVALID_ELEMENT_COORDINATES: number,
  IME_NOT_AVAILABLE: number,
  IME_ENGINE_ACTIVATION_FAILED: number,
  INVALID_SELECTOR_ERROR: number,
  SESSION_NOT_CREATED: number,
  MOVE_TARGET_OUT_OF_BOUNDS: number,
  SQL_DATABASE_ERROR: number,
  INVALID_XPATH_SELECTOR: number,
  INVALID_XPATH_SELECTOR_RETURN_TYPE: number,
  METHOD_NOT_ALLOWED: number
};

//
//	TYPES
//

declare type webdriver$location = {
  x: number,
  y: number
};

declare type webdriver$offset = {
  x: number,
  y: number
};

declare type webdriver$speed = {
  xspeed: number,
  yspeed: number
};

declare type webdriver$size = {
  width: number,
  height: number
};

declare type webdriver$proxyConfig = {
  proxyType: string,
  proxyAutoconfigUrl?: string,
  ftpProxy?: string,
  httpProxy?: string,
  sslProxy?: string,
  noProxy?: string
};

declare type webdriver$optionsCookie = {
  name: string,
  value: string,
  path?: string,
  domain?: string,
  secure?: boolean,
  expiry?: number
};

//
//	CLASSES
//

declare class webdriver$Frame {
  constructor(
    context?: string,
    name?: string,
    alias?: string,
    path?: string
  ): webdriver$Frame;
  getName(): string;
  getUrl(): string;
  getLine(): number;
  getColumn(): number;
  isAnonymous(): boolean;
  toString(): string;
}

declare class webdriver$Snapshot {
  constructor(opt_slice?: number): webdriver$Snapshot;
  getStacktrace(): webdriver$Frame[];
}

declare type webdriver$StacktraceLib = {
  Frame: webdriver$Frame,
  Snapshot: webdriver$Snapshot,
  format(error: any): any,
  get(): webdriver$Frame[],
  BROWSER_SUPPORTED: boolean
};

declare class webdriver$Error extends Error {
  constructor(code: number, opt_message?: string): webdriver$Error;
}

declare class webdriver$ElementNotSelectableError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$ElementNotSelectableError;
}

declare class webdriver$ElementNotInteractableError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$ElementNotInteractableError;
}

declare class webdriver$ElementNotVisibleError extends webdriver$ElementNotInteractableError {
  constructor(opt_error?: string): webdriver$ElementNotVisibleError;
}

declare class webdriver$InvalidArgumentError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$InvalidArgumentError;
}

declare class webdriver$InvalidCookieDomainError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$InvalidCookieDomainError;
}

declare class webdriver$InvalidElementCoordinatesError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$InvalidElementCoordinatesError;
}

declare class webdriver$InvalidElementStateError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$InvalidElementStateError;
}

declare class webdriver$InvalidSelectorError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$InvalidSelectorError;
}

declare class webdriver$NoSuchSessionError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$NoSuchSessionError;
}

declare class webdriver$JavascriptError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$JavascriptError;
}

declare class webdriver$MoveTargetOutOfBoundsError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$MoveTargetOutOfBoundsError;
}

declare class webdriver$NoSuchAlertError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$NoSuchAlertError;
}

declare class webdriver$NoSuchElementError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$NoSuchElementError;
}

declare class webdriver$NoSuchFrameError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$NoSuchFrameError;
}

declare class webdriver$NoSuchWindowError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$NoSuchWindowError;
}

declare class webdriver$ScriptTimeoutError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$ScriptTimeoutError;
}

declare class webdriver$SessionNotCreatedError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$SessionNotCreatedError;
}

declare class webdriver$StaleElementReferenceError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$StaleElementReferenceError;
}

declare class webdriver$TimeoutError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$TimeoutError;
}

declare class webdriver$UnableToSetCookieError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnableToSetCookieError;
}

declare class webdriver$UnableToCaptureScreenError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnableToCaptureScreenError;
}

declare class webdriver$UnexpectedAlertOpenError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnexpectedAlertOpenError;
}

declare class webdriver$UnknownCommandError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnknownCommandError;
}

declare class webdriver$UnknownMethodError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnknownMethodError;
}

declare class webdriver$UnsupportedOperationError extends webdriver$Error {
  constructor(opt_error?: string): webdriver$UnsupportedOperationError;
}

declare type webdriver$ErrorLib = {
  ErrorCode: webdriver$ErrorCodeEnum,

  WebDriverError: webdriver$Error,
  ElementNotSelectableError: webdriver$ElementNotSelectableError,
  ElementNotInteractableError: webdriver$ElementNotInteractableError,
  ElementNotVisibleError: webdriver$ElementNotVisibleError,
  InvalidArgumentError: webdriver$InvalidArgumentError,
  InvalidCookieDomainError: webdriver$InvalidCookieDomainError,
  InvalidElementCoordinatesError: webdriver$InvalidElementCoordinatesError,
  InvalidElementStateError: webdriver$InvalidElementStateError,
  InvalidSelectorError: webdriver$InvalidSelectorError,
  NoSuchSessionError: webdriver$NoSuchSessionError,
  JavascriptError: webdriver$JavascriptError,
  MoveTargetOutOfBoundsError: webdriver$MoveTargetOutOfBoundsError,
  NoSuchAlertError: webdriver$NoSuchAlertError,
  NoSuchElementError: webdriver$NoSuchElementError,
  NoSuchFrameError: webdriver$NoSuchFrameError,
  NoSuchWindowError: webdriver$NoSuchWindowError,
  ScriptTimeoutError: webdriver$ScriptTimeoutError,
  SessionNotCreatedError: webdriver$SessionNotCreatedError,
  StaleElementReferenceError: webdriver$StaleElementReferenceError,
  TimeoutError: webdriver$TimeoutError,
  UnableToSetCookieError: webdriver$UnableToSetCookieError,
  UnableToCaptureScreenError: webdriver$UnableToCaptureScreenError,
  UnexpectedAlertOpenError: webdriver$UnexpectedAlertOpenError,
  UnknownCommandError: webdriver$UnknownCommandError,
  UnknownMethodError: webdriver$UnknownMethodError,
  UnsupportedOperationError: webdriver$UnsupportedOperationError,

  checkResponse(data: any): any,
  checkLegacyResponse(data: any): any,
  encodeError(err: any): { error: string, message: string },
  isErrorResponse(data: any): boolean,
  throwDecodedError(data: { error: string, message: string }): void
};

declare class webdriver$Level {
  constructor(name: string, level: number): this;
  toString(): string;
  getLevel(nameOrValue: string | number): webdriver$Level;

  OFF: webdriver$Level;
  SEVERE: webdriver$Level;
  WARNING: webdriver$Level;
  INFO: webdriver$Level;
  DEBUG: webdriver$Level;
  FINE: webdriver$Level;
  FINER: webdriver$Level;
  FINEST: webdriver$Level;
  ALL: webdriver$Level;
}

declare class webdriver$LoggingPreferences {
  constructor(): this;
  setLevel(type: string, level: webdriver$Level): void;
  toJSON(): { [key: string]: string };
}

declare class webdriver$Entry {
  constructor(
    level: webdriver$Level | string,
    message: string,
    opt_timestamp?: number,
    opt_type?: string
  ): webdriver$Entry;
  level: webdriver$Level;
  message: string;
  timestamp: number;
  type: string;
  static fromClosureLogRecord(
    logRecord: any,
    opt_type?: string
  ): webdriver$Entry;
  toJSON(): { level: string, message: string, timestamp: number, type: string };
}

declare class webdriver$Logger {
  constructor(name: string, opt_level?: webdriver$Level): this;

  name_: string;
  level_: webdriver$Level;
  parent_: webdriver$Logger;
  handlers_: any;

  getName(): string;
  setLevel(level: webdriver$Level): void;
  getLevel(): webdriver$Level;
  getEffectiveLevel(): webdriver$Level;
  isLoggable(level: webdriver$Level): boolean;
  addHandler(handler: any): void;
  removeHandler(handler: any): void;
  log(level: webdriver$Level, loggable: string | Function): void;
  severe(loggable: string | Function): void;
  warning(loggable: string | Function): void;
  info(loggable: string | Function): void;
  debug(loggable: string | Function): void;
  fine(loggable: string | Function): void;
  finer(loggable: string | Function): void;
  finest(loggable: string | Function): void;
}

declare class webdriver$LogManager {
  getLogger(name: string): webdriver$Logger;
  createLogger_(name: string, parent: webdriver$Logger): webdriver$Logger;
}

declare type webdriver$LoggingLib = {
  Entry: webdriver$Entry,
  Level: webdriver$Level,
  LogManager: webdriver$LogManager,
  Logger: webdriver$Logger,
  Preferences: Class<webdriver$LoggingPreferences>,
  Type: webdriver$LoggingTypeEnum,
  addConsoleHandler(opt_logger?: webdriver$Logger): void,
  getLevel(nameOrValue: string | number): webdriver$Level,
  getLogger(name?: string): webdriver$Logger,
  installConsoleHandler(): void,
  removeConsoleHandler(opt_logger?: webdriver$Logger): void
};

declare class webdriver$Command {
  constructor(name: string): webdriver$Command;
  getName(): string;
  setParameter(name: string, value: any): webdriver$Command;
  setParameters(parameters: any): webdriver$Command;
  getParameter(key: string): any;
  getParameters(): any;
}

declare class webdriver$CommandExecutor {
  execute(
    command: webdriver$Command,
    callback: (error: webdriver$Error, responseObject: any) => any
  ): void;
}

declare class webdriver$EventEmitter {
  constructor(): webdriver$EventEmitter;
  emit(type: string, ...var_args: any[]): void;
  listeners(
    type: string
  ): Array<{ fn: Function, oneshot: boolean, scope: any }>;
  addListener(
    type: string,
    listenerFn: Function,
    opt_scope?: any
  ): webdriver$EventEmitter;
  once(type: string, listenerFn: any, opt_scope?: any): webdriver$EventEmitter;
  on(
    type: string,
    listenerFn: Function,
    opt_scope?: any
  ): webdriver$EventEmitter;
  removeListener(type: string, listenerFn: Function): webdriver$EventEmitter;
  removeAllListeners(opt_type?: string): webdriver$EventEmitter;
}

declare class webdriver$ControlFlow extends webdriver$EventEmitter {
  constructor(): webdriver$ControlFlow;
  static EventType: {
    IDLE: string,
    RESET: string,
    SCHEDULE_TASK: string,
    UNCAUGHT_EXCEPTION: string
  };
  toString(): string;
  reset(): void;
  getSchedule(opt_includeStackTraces?: boolean): string;
  execute<T>(
    fn: () => (T | webdriver$Promise<T>) | Generator<any>,
    opt_description?: string
  ): webdriver$Promise<T>;
  timeout(ms: number, opt_description?: string): webdriver$Promise<void>;
  wait<T>(
    condition: webdriver$Promise<T> | Function,
    opt_timeout?: number,
    opt_message?: string
  ): webdriver$Promise<T>;
}

declare class webdriver$FileDetector {
  constructor(): webdriver$FileDetector;
  handleFile(
    driver: webdriver$WebDriver,
    path: string
  ): webdriver$Promise<string>;
}

declare class webdriver$Session {
  constructor(id: string, capabilities: any): webdriver$Session;
  getId(): string;
  getCapabilities(): webdriver$Capabilities;
  getCapability(key: string): any;
  toJSON(): string;
}

declare class webdriver$Capabilities {
  constructor(opt_other?: any): webdriver$Capabilities;
  toJSON(): any;
  merge(other: webdriver$Capabilities): webdriver$Capabilities;
  merge(other: any): webdriver$Capabilities;
  set(key: string, value: any): webdriver$Capabilities;
  setLoggingPrefs(prefs: webdriver$LoggingPreferences): webdriver$Capabilities;
  setLoggingPrefs(prefs: { [key: string]: string }): webdriver$Capabilities;
  setProxy(proxy: webdriver$proxyConfig): webdriver$Capabilities;
  setEnableNativeEvents(enabled: boolean): webdriver$Capabilities;
  setScrollBehavior(behavior: number): webdriver$Capabilities;
  setAlertBehavior(behavior: string): webdriver$Capabilities;
  get(key: string): any;
  has(key: string): boolean;
  static android(): webdriver$Capabilities;
  static chrome(): webdriver$Capabilities;
  static firefox(): webdriver$Capabilities;
  static ie(): webdriver$Capabilities;
  static ipad(): webdriver$Capabilities;
  static iphone(): webdriver$Capabilities;
  static opera(): webdriver$Capabilities;
  static phantomjs(): webdriver$Capabilities;
  static safari(): webdriver$Capabilities;
  static htmlunit(): webdriver$Capabilities;
  static htmlunitwithjs(): webdriver$Capabilities;
}

declare class webdriver$Options {
  addCookie(
    name: string,
    value: string,
    opt_path?: string,
    opt_domain?: string,
    opt_isSecure?: boolean,
    opt_expiry?: number
  ): webdriver$Promise<void>;
  addCookie(
    name: string,
    value: string,
    opt_path?: string,
    opt_domain?: string,
    opt_isSecure?: boolean,
    opt_expiry?: Date
  ): webdriver$Promise<void>;
  deleteAllCookies(): webdriver$Promise<void>;
  deleteCookie(name: string): webdriver$Promise<void>;
  getCookies(): webdriver$Promise<webdriver$optionsCookie[]>;
  getCookie(name: string): webdriver$Promise<webdriver$optionsCookie>;
  logs(): webdriver$Logs;
  timeouts(): webdriver$Timeouts;
  window(): webdriver$Window;
}

declare class webdriver$Logs {
  get(type: string): webdriver$Promise<webdriver$Entry[]>;
  getAvailableLogTypes(): webdriver$Promise<string[]>;
}

declare class webdriver$Window {
  getPosition(): webdriver$Promise<webdriver$location>;
  setPosition(x: number, y: number): webdriver$Promise<void>;
  getSize(): webdriver$Promise<webdriver$size>;
  setSize(width: number, height: number): webdriver$Promise<void>;
  maximize(): webdriver$Promise<void>;
}

declare class webdriver$Timeouts {
  implicitlyWait(ms: number): webdriver$Promise<void>;
  setScriptTimeout(ms: number): webdriver$Promise<void>;
  pageLoadTimeout(ms: number): webdriver$Promise<void>;
}

declare class webdriver$Navigation {
  to(url: string): webdriver$Promise<void>;
  back(): webdriver$Promise<void>;
  forward(): webdriver$Promise<void>;
  refresh(): webdriver$Promise<void>;
}

declare class webdriver$Builder {
  constructor(): webdriver$Builder;
  forBrowser(
    name: string,
    opt_version?: string,
    opt_platform?: string
  ): webdriver$Builder;
  build(): webdriver$WebDriver;
  buildAsync(): webdriver$Promise<webdriver$WebDriver>;
  getCapabilities(): webdriver$Capabilities;
  getServerUrl(): string;
  setAlertBehavior(behavior: string): webdriver$Builder;
  // setChromeOptions(options: chrome.Options): webdriver$Builder;
  setControlFlow(flow: webdriver$ControlFlow): webdriver$Builder;
  setEnableNativeEvents(enabled: boolean): webdriver$Builder;
  // setFirefoxOptions(options: firefox.Options): webdriver$Builder;
  setLoggingPrefs(prefs: webdriver$LoggingPreferences): webdriver$Builder;
  setLoggingPrefs(prefs: { [key: string]: string }): webdriver$Builder;
  setProxy(config: webdriver$proxyConfig): webdriver$Builder;
  setScrollBehavior(behavior: number): webdriver$Builder;
  usingServer(url: string): webdriver$Builder;
  withCapabilities(capabilities: webdriver$Capabilities): webdriver$Builder;
  withCapabilities(capabilities: any): webdriver$Builder;
}

declare class webdriver$ActionSequence {
  constructor(driver: webdriver$WebDriver): this;
  perform(): webdriver$Promise<void>;
  mouseMove(
    location: webdriver$WebElement,
    opt_offset?: webdriver$location
  ): webdriver$ActionSequence;
  mouseMove(location: webdriver$location): webdriver$ActionSequence;
  mouseDown(
    opt_elementOrButton?: webdriver$WebElement,
    opt_button?: number
  ): webdriver$ActionSequence;
  mouseDown(opt_elementOrButton?: number): webdriver$ActionSequence;
  mouseUp(
    opt_elementOrButton?: webdriver$WebElement,
    opt_button?: number
  ): webdriver$ActionSequence;
  mouseUp(opt_elementOrButton?: number): webdriver$ActionSequence;
  dragAndDrop(
    element: webdriver$WebElement,
    location: webdriver$WebElement
  ): webdriver$ActionSequence;
  dragAndDrop(
    element: webdriver$WebElement,
    location: webdriver$location
  ): webdriver$ActionSequence;
  click(
    opt_elementOrButton?: webdriver$WebElement,
    opt_button?: number
  ): webdriver$ActionSequence;
  click(opt_elementOrButton?: number): webdriver$ActionSequence;
  doubleClick(
    opt_elementOrButton?: webdriver$WebElement,
    opt_button?: number
  ): webdriver$ActionSequence;
  doubleClick(opt_elementOrButton?: number): webdriver$ActionSequence;
  keyDown(key: string): webdriver$ActionSequence;
  keyUp(key: string): webdriver$ActionSequence;
  sendKeys(...var_args: any[]): webdriver$ActionSequence;
}

declare class webdriver$TouchSequence {
  constructor(driver: Class<webdriver$WebDriver>): webdriver$TouchSequence;
  perform(): webdriver$Promise<void>;
  tap(elem: webdriver$WebElement): webdriver$TouchSequence;
  doubleTap(elem: webdriver$WebElement): webdriver$TouchSequence;
  longPress(elem: webdriver$WebElement): webdriver$TouchSequence;
  tapAndHold(location: webdriver$location): webdriver$TouchSequence;
  move(location: webdriver$location): webdriver$TouchSequence;
  release(location: webdriver$location): webdriver$TouchSequence;
  scroll(offset: webdriver$offset): webdriver$TouchSequence;
  scrollFromElement(
    elem: webdriver$WebElement,
    offset: webdriver$offset
  ): webdriver$TouchSequence;
  flick(speed: webdriver$speed): webdriver$TouchSequence;
  flickElement(
    elem: webdriver$WebElement,
    offset: webdriver$offset,
    speed: number
  ): webdriver$TouchSequence;
}

declare class webdriver$WebDriver {
  constructor(
    session: webdriver$Session | webdriver$Promise<webdriver$Session>,
    executor: webdriver$CommandExecutor,
    opt_flow?: webdriver$ControlFlow
  ): webdriver$WebDriver;
  static Navigation: Class<webdriver$Navigation>;
  static Options: Class<webdriver$Options>;
  static Timeouts: Class<webdriver$Timeouts>;
  static Window: Class<webdriver$Window>;
  static Logs: Class<webdriver$Logs>;
  static TargetLocator: webdriver$TargetLocator;
  static attachToSession(
    executor: webdriver$CommandExecutor,
    sessionId: string,
    opt_flow?: webdriver$ControlFlow
  ): webdriver$WebDriver;
  static createSession(
    executor: webdriver$CommandExecutor,
    desiredCapabilities: webdriver$Capabilities,
    opt_flow?: webdriver$ControlFlow
  ): webdriver$WebDriver;
  controlFlow(): webdriver$ControlFlow;
  schedule<T>(
    command: webdriver$Command,
    description: string
  ): webdriver$Promise<T>;
  setFileDetector(detector: webdriver$FileDetector): void;
  getSession(): webdriver$Promise<webdriver$Session>;
  getCapabilities(): webdriver$Promise<webdriver$Capabilities>;
  quit(): webdriver$Promise<void>;
  actions(): webdriver$ActionSequence;
  touchActions(): webdriver$TouchSequence;
  executeScript<T>(script: string, ...var_args: any[]): webdriver$Promise<T>;
  executeScript<T>(script: Function, ...var_args: any[]): webdriver$Promise<T>;
  executeAsyncScript<T>(
    script: string | Function,
    ...var_args: any[]
  ): webdriver$Promise<T>;
  call<T>(
    fn: (...var_args: any[]) => T | webdriver$Promise<T>,
    opt_scope?: any,
    ...var_args: any[]
  ): webdriver$Promise<T>;
  wait(
    condition: webdriver$Promise<any> | webdriver$Condition | Function,
    timeout: ?number,
    message: ?string
  ): webdriver$Promise<any>;
  sleep(ms: number): webdriver$Promise<void>;
  getWindowHandle(): webdriver$Promise<string>;
  getAllWindowHandles(): webdriver$Promise<string[]>;
  getPageSource(): webdriver$Promise<string>;
  close(): webdriver$Promise<void>;
  get(url: string): webdriver$Promise<void>;
  getCurrentUrl(): webdriver$Promise<string>;
  getTitle(): webdriver$Promise<string>;
  findElement(locator: webdriver$By | Function): webdriver$WebElementPromise;
  isElementPresent(
    locator: webdriver$By | Function
  ): webdriver$Promise<boolean>;
  findElements(
    locator: webdriver$By | Function
  ): webdriver$Promise<webdriver$WebElement[]>;
  takeScreenshot(): webdriver$Promise<string>;
  manage(): webdriver$Options;
  navigate(): webdriver$Navigation;
  switchTo(): webdriver$TargetLocator;
}

// WIP
declare class webdriver$TargetLocator {
  activeElement(): webdriver$WebElementPromise;
  defaultContent(): webdriver$Promise<void>;
  frame(nameOrIndex: string): webdriver$Promise<void>;
  frame(nameOrIndex: number): webdriver$Promise<void>;
  window(nameOrHandle: string): webdriver$Promise<void>;
  //alert(): webdriver$AlertPromise;
}

// WIP
declare class webdriver$By {
  using: string;
  value: string;
  constructor(using: string, value: string): this;
  static className(name: string): this;
  static css(selector: string): this;
  static id(id: string): this;
  static linkText(text: string): this;
  static js(script: string, var_args: any): this;
  static name(name: string): this;
  static partialLinkText(text: string): this;
  static tagName(name: string): this;
  static xpath(xpath: string): this;
}

declare class webdriver$WebElement {
  constructor(
    driver: webdriver$WebDriver,
    id: webdriver$Promise<string> | string
  ): webdriver$WebElement;
  serialize(): { ELEMENT: string } | webdriver$Promise<{ ELEMENT: string }>;
  static Id: { ELEMENT: string };
  static ELEMENT_KEY: string;
  getDriver(): webdriver$WebDriver;
  findElement(locator: webdriver$By | Function): webdriver$WebElementPromise;
  isElementPresent(
    locator: webdriver$By | Function
  ): webdriver$Promise<boolean>;
  findElements(
    locator: webdriver$By | Function
  ): webdriver$Promise<webdriver$WebElement[]>;
  click(): webdriver$Promise<void>;
  sendKeys(var_args: any): webdriver$Promise<void>;
  getTagName(): webdriver$Promise<string>;
  getCssValue(cssStyleProperty: string): webdriver$Promise<string>;
  getAttribute(attributeName: string): webdriver$Promise<string>;
  getText(): webdriver$Promise<string>;
  getSize(): webdriver$Promise<webdriver$size>;
  getLocation(): webdriver$Promise<webdriver$location>;
  isEnabled(): webdriver$Promise<boolean>;
  isSelected(): webdriver$Promise<boolean>;
  submit(): webdriver$Promise<void>;
  clear(): webdriver$Promise<void>;
  isDisplayed(): webdriver$Promise<boolean>;
  getOuterHtml(): webdriver$Promise<string>;
  getId(): webdriver$Promise<string>;
  getRawId(): webdriver$Promise<string>;
  getInnerHtml(): webdriver$Promise<string>;
  static equals(
    a: webdriver$WebElement,
    b: webdriver$WebElement
  ): webdriver$Promise<boolean>;
}

// WIP
declare class webdriver$WebElementPromise extends webdriver$WebElement mixins Promise<webdriver$WebElement> {}

// WIP
declare class webdriver$promise {
  USE_PROMISE_MANAGER: boolean;

  defer(): webdriver$Resolver;
  all(arr: Array<webdriver$Promise<any>>): webdriver$Promise<any>;
}

// WIP
declare class webdriver$Condition {}

// WIP
declare interface webdriver$until {
  ableToSwitchToFrame(
    frame: number | webdriver$WebElement | webdriver$By | Function
  ): webdriver$Condition;
  alertIsPresent(): webdriver$Condition;
  titleIs(title: string): webdriver$Condition;
  titleContains(substr: string): webdriver$Condition;
  titleMatches(regex: RegExp): webdriver$Condition;
  urlIs(url: string): webdriver$Condition;
  urlContains(substrUrl: string): webdriver$Condition;
  urlMatches(regex: RegExp): webdriver$Condition;
  elementLocated(locator: webdriver$By | Function): webdriver$Condition;
  elementsLocated(locator: webdriver$By | Function): webdriver$Condition;
  stalenessOf(element: webdriver$WebElement): webdriver$Condition;
  elementIsVisible(element: webdriver$WebElement): webdriver$Condition;
  elementIsNotVisible(element: webdriver$WebElement): webdriver$Condition;
  elementIsEnabled(element: webdriver$WebElement): webdriver$Condition;
  elementIsDisabled(element: webdriver$WebElement): webdriver$Condition;
  elementIsSelected(element: webdriver$WebElement): webdriver$Condition;
  elementIsNotSelected(element: webdriver$WebElement): webdriver$Condition;
  elementTextIs(
    element: webdriver$WebElement,
    text: string
  ): webdriver$Condition;
  elementTextContains(
    element: webdriver$WebElement,
    substr: string
  ): webdriver$Condition;
  elementTextMatches(
    element: webdriver$WebElement,
    regex: RegExp
  ): webdriver$Condition;
}

// WIP
declare class webdriver$Resolver {
  promise: webdriver$Promise<any>;
  fulfill(obj: any): void;
  reject(obj: any): void;
}

// WIP
declare type webdriver$Promise<T> = Promise<T>;

//
//	MODULES
//

// WIP
declare module "selenium-webdriver" {
  // libs
  //declare export var By: WebDriverByLib;
  declare export var error: webdriver$ErrorLib;
  declare export var logging: webdriver$LoggingLib;
  declare export var promise: webdriver$promise;
  declare export var stacktrace: webdriver$StacktraceLib;
  declare export var until: webdriver$until;

  // classes
  declare export var ActionSequence: Class<webdriver$ActionSequence>;
  declare export var TouchSequence: Class<webdriver$TouchSequence>;
  declare export var Builder: Class<webdriver$Builder>;
  declare export var Capabilities: Class<webdriver$Capabilities>;
  declare export var Command: Class<webdriver$Command>;
  declare export var EventEmitter: Class<webdriver$EventEmitter>;
  declare export var FileDetector: Class<webdriver$FileDetector>;
  declare export var WebDriver: Class<webdriver$WebDriver>;
  declare export var WebElement: Class<webdriver$WebElement>;
  declare export var WebElementPromise: Class<webdriver$WebElementPromise>;
  //declare export var Locator: typeof webdriver$Locator;
  declare export var Session: Class<webdriver$Session>;
  declare export var By: Class<webdriver$By>;
  declare export var Thenable: Class<webdriver$Promise<any>>;

  // props
  declare export var Button: webdriver$ButtonEnum;
  declare export var Key: webdriver$KeyEnum;
  declare export var Browser: webdriver$BrowserEnum;
  declare export var Capability: webdriver$CapabilityEnum;
  declare export var CommandName: webdriver$CommandNameEnum;
}

declare type webdriver_testing$TestFunction = (
  done: (error?: any) => void
) => void | Promise<mixed>;

declare module "selenium-webdriver/testing" {
  declare var describe: {
    (name: string, spec: () => void): void,
    only(description: string, spec: () => void): void,
    skip(description: string, spec: () => void): void,
    timeout(ms: number): void
  };

  declare var context: typeof describe;

  declare var it: {
    (name: string, spec?: webdriver_testing$TestFunction): void,
    only(description: string, spec: webdriver_testing$TestFunction): void,
    skip(description: string, spec: webdriver_testing$TestFunction): void,
    timeout(ms: number): void
  };

  declare function before(method: webdriver_testing$TestFunction): void;
  declare function beforeEach(method: webdriver_testing$TestFunction): void;
  declare function after(method: webdriver_testing$TestFunction): void;
  declare function afterEach(method: webdriver_testing$TestFunction): void;
}

declare type webdriver_remote$ServiceOptions = {
  loopback?: boolean;
  port?: number | Promise<number>;
  args?: Array<string> | Promise<Array<string>>;
  jvmArgs?: Array<string> | Promise<Array<string>>;
  env?: {[string]: string};
  stdio?: string | Array<string|number|stream$Writable>;
};

declare class webdriver_remote$DriverService {
  constructor(
    executable: string,
    options: webdriver_remote$ServiceOptions,
  ): this;

  address(): Promise<string>;
  isRunning(): boolean;
  kill(): Promise<void>;
  start(opt_timeoutMs?: number): Promise<string>;
  stop(): Promise<void>;

  static DEFAULT_START_TIMEOUT_MS: number;
}

declare class webdriver_remote$SeleniumServer extends webdriver_remote$DriverService {}

declare module "selenium-webdriver/remote" {
  declare export var DriverService: Class<webdriver_remote$DriverService>;
  declare export var SeleniumServer: Class<webdriver_remote$SeleniumServer>;
}
