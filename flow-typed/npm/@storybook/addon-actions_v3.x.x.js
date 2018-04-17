// flow-typed signature: d33e1b8f0888822895515e3ca6a3f8eb
// flow-typed version: 1709d3212d/@storybook/addon-actions_v3.x.x/flow_>=v0.25.x

declare module '@storybook/addon-actions' {
  declare type Action = (name: string) => Function;
  declare type DecorateFn = (args: Array<any>) => Array<any>;

  declare module.exports: {
    action: Action,
    decorateAction(args: Array<DecorateFn>): Action,
  };
}
