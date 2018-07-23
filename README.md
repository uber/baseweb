# BASE UI

[![Build status](https://badge.buildkite.com/4c46e1f96d71ca1eaab3236c90a8ff4d218eb818e412ba1cf9.svg?branch=master)](https://buildkite.com/uber/baseui)

### Usage

Add `baseui` to your project:

```bash
# using yarn
yarn add baseui

# using npm
npm install baseui
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import {StatefulInput as Input} from 'baseui/input';

function App() {
  return <Input placeholder="First name" required="true" />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Docs

[Docs by Storybook](https://baseui.netlify.com/)

### Contributing

[Contributing](CONTRIBUTING.md)
