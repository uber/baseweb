import * as vscode from 'vscode';

// @ts-ignore
import {components} from './components.json';

export function activate(context: vscode.ExtensionContext) {
  // @ts-ignore
  components.forEach((component: string) => {
    let disposable = vscode.commands.registerCommand(
      `extension.baseweb.docs.${component}`,
      () => {
        vscode.env.openExternal(
          vscode.Uri.parse(`https://baseweb.design/components/${component}`),
        );
      },
    );

    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
