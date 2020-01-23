import {TProp, TImportsConfig} from 'react-view';
import buttonConfig from '../documentation-site/components/yard/config/button';

const buildSnippet = (
  componentName: string,
  imports: TImportsConfig,
  props: {[key: string]: TProp<any>},
) => {
  console.log(componentName, imports, props);
  return '<Button>';
};

buildSnippet('Button', buttonConfig.imports, buttonConfig.props);
//export default generateSnippet;
