import * as vscode from 'vscode';
import {LightTheme, DarkTheme} from 'baseui';

export default (context: vscode.ExtensionContext) => {
  let timeout: NodeJS.Timer | undefined = undefined;
  let activeEditor = vscode.window.activeTextEditor;

  // create a decorator type that we use to decorate small numbers
  const getColorDecorationType = (coloringStyle: string, colorVal: string) =>
    vscode.window.createTextEditorDecorationType({
      borderWidth:
        coloringStyle === 'border'
          ? '2px'
          : coloringStyle === 'underline'
          ? '0 0 2px'
          : '0',
      borderStyle: 'solid',
      borderColor: colorVal,
      backgroundColor:
        coloringStyle === 'background' ? colorVal : 'transparent',
      opacity: 0.5,
    });

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }

    const workspaceConfig = vscode.workspace.getConfiguration('baseweb');
    const isColoringOn = workspaceConfig.get('theme.coloring.enabled');
    if (!isColoringOn) {
      return;
    }
    const themeMode = workspaceConfig.get('theme.coloring.source');
    const theme = themeMode === 'Light' ? LightTheme : DarkTheme;
    const coloringStyle = workspaceConfig.get('theme.coloring.style');

    const regEx = /colors\.\w+/g;
    const text = activeEditor.document.getText();
    let match;
    while ((match = regEx.exec(text))) {
      // exclude the `colors.` part
      const startPos = activeEditor.document.positionAt(match.index + 7);
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length,
      );
      const colorVal = theme.colors[match[0].slice(7)] || 'transparent';
      const decoration = {
        range: new vscode.Range(startPos, endPos),
        hoverMessage: `${colorVal} | ${themeMode}Theme`,
      };
      activeEditor.setDecorations(
        getColorDecorationType(coloringStyle, colorVal),
        [decoration],
      );
    }
  }

  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 500);
  }

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  vscode.workspace.onDidChangeConfiguration(event => {
    if (
      event.affectsConfiguration('baseweb.theme.coloring.enabled') ||
      event.affectsConfiguration('baseweb.theme.coloring.source') ||
      event.affectsConfiguration('baseweb.theme.coloring.style')
    ) {
      triggerUpdateDecorations();
    }
  }),
    vscode.window.onDidChangeActiveTextEditor(
      editor => {
        activeEditor = editor;
        if (editor) {
          triggerUpdateDecorations();
        }
      },
      null,
      context.subscriptions,
    );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions,
  );
};
