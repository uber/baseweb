import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.baseweb.docs.select',
    comnponentName => {
      // The code you place here will be executed every time your command is executed

      vscode.env.openExternal(
        vscode.Uri.parse('https://baseweb.design/components/select'),
      );
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
