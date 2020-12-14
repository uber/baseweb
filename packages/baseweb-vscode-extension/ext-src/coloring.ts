import * as vscode from 'vscode';
import {LightTheme, DarkTheme} from 'baseui/themes';

function getContrastYIQ(color: string) {
  let hexcolor = color;
  if (hexcolor.length < 7) {
    hexcolor = hexcolor.replace(
      /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g,
      '#$1$1$2$2$3$3',
    );
  }
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

function isAcceptedColorValue(color: string | undefined) {
  if (!color) return false;
  return color.startsWith('#') || color.startsWith('rgb');
}

export default (context: vscode.ExtensionContext) => {
  let timeout: NodeJS.Timer | undefined = undefined;
  let activeEditor = vscode.window.activeTextEditor;

  const decorationTypeMap: any = {};

  // Handle theme props other than colors
  // Create a decorator type that we use to decorate theme props.
  // We do not apply any styles to the theme props other than colors
  const emptyDecorationType = vscode.window.createTextEditorDecorationType({});
  let themePropsDecorationList: Array<any> = [];

  // Create a decorator type that we use to decorate theme colors
  function getColorDecorationType(coloringStyle: string, colorVal: string) {
    const decorationType = vscode.window.createTextEditorDecorationType({
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
      ...(coloringStyle === 'background' && colorVal.startsWith('#')
        ? {color: getContrastYIQ(colorVal)}
        : {}),
    });
    return decorationType;
  }

  // Memoize decorator types per color value and current coloringStyle setting
  function getMemoizedDecorationType(coloringStyle: string, colorVal: string) {
    if (!decorationTypeMap[colorVal]) {
      decorationTypeMap[colorVal] = {};
      decorationTypeMap[colorVal].style = coloringStyle;
      decorationTypeMap[colorVal].type = getColorDecorationType(
        coloringStyle,
        colorVal,
      );
      decorationTypeMap[colorVal].decorations = [];
    } else if (decorationTypeMap[colorVal].style !== coloringStyle) {
      decorationTypeMap[colorVal].style = coloringStyle;
      decorationTypeMap[colorVal].type = getColorDecorationType(
        coloringStyle,
        colorVal,
      );
    }
    return decorationTypeMap[colorVal];
  }

  // Set decorations
  function decorate(activeEditor: vscode.TextEditor) {
    const keys: Array<any> = [];
    for (const prop in decorationTypeMap) {
      if (decorationTypeMap.hasOwnProperty(prop)) {
        keys.push(prop);
      }
    }
    keys.forEach(key => {
      activeEditor.setDecorations(
        decorationTypeMap[key].type,
        decorationTypeMap[key].decorations,
      );
    });
  }

  // Unset decorations
  function undecorate(activeEditor: vscode.TextEditor) {
    const keys: Array<any> = [];
    for (const prop in decorationTypeMap) {
      if (decorationTypeMap.hasOwnProperty(prop)) {
        keys.push(prop);
      }
    }
    keys.forEach(key => {
      decorationTypeMap[key].decorations = [];
      activeEditor.setDecorations(
        decorationTypeMap[key].type,
        decorationTypeMap[key].decorations,
      );
    });
  }

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }
    // Unset all memoized decorations
    // and clear the lists of decorations for every decoration type
    undecorate(activeEditor);

    // Handle theme props other than colors
    // Clear the lists of decorations
    // and unset all decorations
    themePropsDecorationList = [];
    activeEditor.setDecorations(emptyDecorationType, themePropsDecorationList);

    const workspaceConfig = vscode.workspace.getConfiguration('baseweb');
    // Get the coloring enabled/disabled setting
    const isColoringOn = workspaceConfig.get('theme.coloring.enabled');

    // If the coloring feature is set to false exit
    if (!isColoringOn) {
      return;
    }

    // Get the Theme choice setting
    const themeMode = workspaceConfig.get('theme.coloring.source');
    // Use the theme according to the current setting
    const theme = themeMode === 'Light' ? LightTheme : DarkTheme;
    // Get the coloring style setting
    const coloringStyle: string =
      workspaceConfig.get('theme.coloring.style') || '';

    // RegExp for finding `colors.[THEME_PROP]`
    const regEx = /(^|\W)(colors\.)(\w+)/gm;
    // Get the current active document's text
    const text = activeEditor.document.getText();
    let match;
    // Find matches to decorate accordingly
    while ((match = regEx.exec(text))) {
      // @ts-ignore
      const themeColorVal: string | undefined = theme.colors[match[3]];
      // Do not decorate if the found color key is not present in the theme object
      if (!themeColorVal) {
        continue;
      }
      // It should never get to here if `!themeColorVal`
      // but adding a default `transparent` to satisfy types
      const colorVal: string = isAcceptedColorValue(themeColorVal)
        ? themeColorVal
        : 'transparent';
      // Start position excluding the `colors.` part
      const startPos = activeEditor.document.positionAt(
        match.index + match[1].length + match[2].length,
      );
      // End position of the match
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length,
      );
      // Create decoration for the current match position
      const decoration = {
        range: new vscode.Range(startPos, endPos),
        hoverMessage: `${colorVal} | ${themeMode}Theme`,
      };
      // Create and memoize a decoration type for the found color value
      // or pull a memoized decoration type if not the first match
      // for the color value and current coloring style setting
      const memoizedDecorationType = getMemoizedDecorationType(
        coloringStyle,
        colorVal,
      );
      // Add the decoration for the current match to the list
      memoizedDecorationType.decorations.push(decoration);
    }
    // Apply all memoized decorations
    decorate(activeEditor);

    // Handle theme props other than colors
    // List of theme props we show hints for
    const themeProps = [
      'animation',
      'borders',
      'breakpoints',
      'lighting',
      'sizing',
      'typography',
    ];
    for (let i = 0; i < themeProps.length; i++) {
      const regEx = new RegExp(`(\^|\\W)(${themeProps[i]}\\.)(\\w+)`, 'gm');
      // Find matches to decorate accordingly
      while ((match = regEx.exec(text))) {
        // @ts-ignore
        const themePropVal: any = theme[themeProps[i]][match[3]];
        // Do not decorate if the found prop key is not present in the theme object
        if (!themePropVal) {
          continue;
        }
        // Start position excluding the `sizing.` part
        const startPos = activeEditor.document.positionAt(
          match.index + match[1].length + match[2].length,
        );
        // End position of the match
        const endPos = activeEditor.document.positionAt(
          match.index + match[0].length,
        );
        // Create decoration for the current match position
        const decoration = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage: `${JSON.stringify(themePropVal)} | ${themeMode}Theme`,
        };
        // Add the decoration for the current match to the list
        themePropsDecorationList.push(decoration);
      }
    }
    // Apply all decorations
    activeEditor.setDecorations(emptyDecorationType, themePropsDecorationList);
  }

  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 200);
  }

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  // Subscribe for the settings change events
  vscode.workspace.onDidChangeConfiguration(event => {
    if (
      event.affectsConfiguration('baseweb.theme.coloring.enabled') ||
      event.affectsConfiguration('baseweb.theme.coloring.source') ||
      event.affectsConfiguration('baseweb.theme.coloring.style')
    ) {
      triggerUpdateDecorations();
    }
  }),
    // Subscribe for active editor change events
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
  // Subscribe for document change events
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
