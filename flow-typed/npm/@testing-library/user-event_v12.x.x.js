declare module '@testing-library/user-event' {
  // As of Flow 0.134.x WindowProxy is any, which would annihilate all typechecking.
  declare type TargetElement = Element; /* | WindowProxy */

  declare type TypeOpts = {|
    skipClick?: boolean,
    skipAutoClose?: boolean,
    initialSelectionStart?: number,
    initialSelectionEnd?: number,
  |};
  declare type TypeOptsDelay = {|
    ...TypeOpts,
    delay: number,
  |};

  /* Source for keyboard: https://github.com/testing-library/user-event/blob/main/src/keyboard/types.ts */
  declare type KeyboardKey = {|
    code?: string,
    key?: string,
    /** Location on the keyboard for keys with multiple representation
     * STANDARD = 0,
     * LEFT = 1,
     * RIGHT = 2,
     * NUMPAD = 3
     */
    location?: 0 | 1 | 2 | 3,
    keyCode?: number,
    altGr?: boolean,
    shift?: boolean,
  |};
  declare type BaseKeyboardOpts = {|
    document?: Document,
    autoModify?: boolean,
    keyboardMap?: Array<KeyboardKey>,
  |};
  declare type KeyboardState = {|
    pressed: Array<{|
      keyDef: KeyboardKey,
      unpreventedDefault: boolean,
    |}>,
    modifiers: {|
      alt: boolean,
      caps: boolean,
      ctrl: boolean,
      meta: boolean,
      shift: boolean,
    |},
    activeElement: TargetElement | null,
    carryValue?: string,
    carryChar: string,
  |};

  declare type KeyboardOpts = BaseKeyboardOpts;
  declare type KeyboardOptsDelay = {|
    ...BaseKeyboardOpts,
    /** Delay between keystrokes */
    delay: number,
  |};

  declare type TabUserOptions = {|
    shift?: boolean,
    focusTrap?: Document | Element,
  |};

  declare type FilesArgument = File | File[];

  declare type UploadInitArgument = {|
    clickInit?: MouseEvent$MouseEventInit,
    changeInit?: Event,
  |};

  declare type ClickOptions = {|
    skipHover?: boolean,
    clickCount?: number,
  |};

  declare function clear(element: TargetElement): void;

  declare function click(
    element: TargetElement,
    eventInit?: MouseEvent$MouseEventInit,
    options?: ClickOptions,
  ): void;

  declare function dblClick(
    element: TargetElement,
    eventInit?: MouseEvent$MouseEventInit,
    options?: ClickOptions,
  ): void;

  declare function selectOptions(
    element: TargetElement,
    values: string | string[] | HTMLElement | HTMLElement[],
    eventInit?: MouseEvent$MouseEventInit,
  ): void;

  declare function deselectOptions(
    element: TargetElement,
    values: string | string[] | HTMLElement | HTMLElement[],
    eventInit?: MouseEvent$MouseEventInit,
  ): void;

  declare function upload(
    element: TargetElement,
    files: FilesArgument,
    init?: UploadInitArgument,
  ): void;

  declare function type(
    element: TargetElement,
    text: string,
    userOpts?: TypeOpts,
  ): void;
  declare function type(
    element: TargetElement,
    text: string,
    userOpts: TypeOptsDelay,
  ): Promise<void>;

  declare function keyboard(
    text: string,
    options?: KeyboardOpts,
  ): KeyboardState;
  declare function keyboard(
    text: string,
    options: KeyboardOptsDelay,
  ): Promise<KeyboardState>;

  declare function tab(userOpts?: TabUserOptions): void;

  declare function paste(
    element: TargetElement,
    text: string,
    eventInit?: MouseEvent$MouseEventInit,
    pasteOptions?: {|
      initialSelectionStart?: number,
      initialSelectionEnd?: number,
    |},
  ): void;

  declare function hover(
    element: TargetElement,
    init?: MouseEvent$MouseEventInit,
  ): void;

  declare function unhover(
    element: TargetElement,
    init?: MouseEvent$MouseEventInit,
  ): void;

  declare type UserEvent = {|
    clear: typeof clear,
    click: typeof click,
    dblClick: typeof dblClick,
    deselectOptions: typeof deselectOptions,
    hover: typeof hover,
    paste: typeof paste,
    selectOptions: typeof selectOptions,
    tab: typeof tab,
    type: typeof type,
    keyboard: typeof keyboard,
    unhover: typeof unhover,
    upload: typeof upload,
  |};

  declare export default UserEvent;
}
