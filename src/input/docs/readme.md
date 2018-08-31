~~~javascript
import {LightTheme, ThemeProvider} from 'baseui';
import {StatefulInput as Input} from 'baseui/input';

export default function Hello() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Input />
    </ThemeProvider>
  );
}
~~~