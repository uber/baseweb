# File Uploader Component

A component to upload a selected or gragged file or multiple files.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';

export default () => <FileUploader action={url} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';

export default () => {
  return
    <FileUploader
      action={url}
      onChange={(file)=>{console.log(`File ${file.name} have been selected`)}}
      overrides={{
        FileSelect: CustomButton,
      }}
    />;
}
```

## Exports

* `FileUploader`
* `StyledRoot`
* `StyledContentContainer`
* `StyledFileDragAndDrop`
* `StyledFileSelectButton`
* `StyledInput`

## `FileUploader` API

* `accept: ?string` - Optional, Defaults to `null`
  Defines the types of files that can be selected. See [input accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
* `action: string | function: () => string` - Optional | Required, Defaults to ''
  Sets the uploading URL. Is Required when `autoUpload` is set to `true`
* `autoUpload: boolean` - Optional, Defaults to `true`
  Defines if a selected file should start uploading automatically
* `disabled: boolean` - Optional, Defaults to `false`
  Defines if the control is disabled
* `multi: boolean` - Optional, Defaults to `false`
  Defines if multiple files can be selected
* `onChange: function({file, event})` - Optional
  A function called when a file is selected
* `onError: function({error})` - Optional, Defaults to `false`
  A function called when a file upload failed
* `onFileUploaded: function({file, event})` - Optional
  A function called when file is done uploading. It's not called if autoUpload is set to `false`
* `onFileRemove: function({file, event})` - Optional
  A function called on a remove file action
`overrides: {Root, ContentContainer, FileDragAndDrop, FileSelectButton, Input}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `request: {data: {} | function, headers: {}}` - Optional
  Sets uploading params, headers

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
* `$multi: boolean`
* `$isFocused: boolean`
* `$error: boolean`
* `$theme: theme`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

* The focusable "Browse files" label will have `role="button"` set
* "Browse files" label will also have `aria-controls="fileupload"` set
* For the keyboard support and navigation "Browse files" needs distinctive focus styles and `cursor: pointer` on hover.
* Show only "Browse files" label when drag & drop file upload is not supported.
