import {TProp, TImportsConfig} from 'react-view';
import buttonConfig from '../documentation-site/components/yard/config/button';

// vendored code from react-view
const addToImportList = (
  importList: TImportsConfig,
  imports: TImportsConfig,
) => {
  for (const [importFrom, importNames] of Object.entries(imports)) {
    if (!importList.hasOwnProperty(importFrom)) {
      importList[importFrom] = {
        named: [],
        default: '',
      };
    }
    if (importNames.default) {
      importList[importFrom].default = importNames.default;
    }
    if (importNames.named && importNames.named.length > 0) {
      if (!importList[importFrom].hasOwnProperty('named')) {
        importList[importFrom]['named'] = [];
      }
      importList[importFrom].named = [
        ...new Set(
          (importList[importFrom].named as string[]).concat(importNames.named),
        ),
      ];
    }
  }
};

const joinNamed = (items: string[] | undefined, ctr: number) => {
  if (!items) return '';
  let output = `\${${ctr++}:{`;
  for (let i = 0; i < items.length; i++) {
    if (i !== items.length - 1) {
      output += `\${${ctr++}:${items[i]}, }`;
    } else {
      output += `\${${ctr++}:${items[i]}}`;
    }
  }
  return `${output}\\}}`;
};

const buildSnippet = (
  componentName: string,
  imports: TImportsConfig,
  props: {[key: string]: TProp<any>},
) => {
  const importList = JSON.parse(JSON.stringify(imports)) as TImportsConfig;

  // prop level imports (typically enums related) that are displayed
  // only when the prop is being used
  Object.values(props).forEach(prop => {
    if (prop.imports) {
      addToImportList(importList, prop.imports);
    }
  });
  const importBody = [];
  let ctr = 1;
  for (const from in importList) {
    const def = importList[from].default;
    const named =
      Array.isArray(importList[from].named) &&
      (importList[from].named as string[]).length > 0
        ? importList[from].named
        : undefined;
    const defaultImport = def ? `\${${ctr++}:${def}${named ? ', }' : ''}` : '';
    importBody.push(
      `import ${defaultImport}${joinNamed(named, ctr)} from '${from}';`,
    );
    if (named) {
      ctr += named.length + 1;
    }
  }

  // const importSnippet = {
  //   prefix: [`${componentName} import`],
  //   description: `Base ${componentName} import.`,
  // };

  //console.log(componentName, imports, props);
  console.log(importList, importBody);
  return componentName;
};

buildSnippet('Button', buttonConfig.imports, buttonConfig.props);
//export default generateSnippet;
