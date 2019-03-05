# Event Handler Usage in Base Web

In Base Web we follow this event handler pattern:

- custom handlers, or handler overrides with custom logic follow use the `onChange({event, value})` method signature,
- pass-through handlers, such as `onBlur` or `onMouseEnter` are not changed.
