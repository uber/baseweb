# File Uploader Component

A component to upload a selected or dragged file or multiple files.

## Usage

### Basic usage

```javascript
import React from 'react';
import {Unstable_FileUploader} from 'baseui/file-uploader';

export default () => (
  <Unstable_FileUploader
    onDrop={(acceptedFiles, rejectedFiles)=>{
      // Do something with the files.
    }}
  />
);
```

### Advanced usage

```javascript
import React from 'react';
import {Unstable_FileUploader} from 'baseui/file-uploader';

export default () => (
  <Unstable_FileUploader
    onDrop={(acceptedFiles, rejectedFiles)=>{
      // Do something with the files.
    }}
    overrides={{
      FileDragAndDrop: {props: {children: 'this is my dropzone content'}},
      AcceptedFile: MyCustomAcceptedFileComponent,
    }}
  />
);
```

Customize further by using `react-dropzone` directly. See information provided by
[`react-dropzone`](https://react-dropzone.netlify.com/).

```javascript
import React from 'react';
import Dropzone from 'react-dropzone';
import {Button} from 'baseui/button';
import {StyledRoot, StyledFileDragAndDrop, StyledHiddenInput} from 'baseui/file-uploader';

export default () => (
  <Dropzone
    onDrop={(acceptedFiles, rejectedFiles)=>{
      // Do something with the files.
    }}
  >
    {({ getRootProps, getInputProps, open }) => (
      <StyledRoot>
        <StyledFileDragAndDrop {...getRootProps({refKey: '$ref'})}>
          This is custom content rendered in the dropzone ui
        </StyledFileDragAndDrop>
        <StyledHiddenInput {...getInputProps({refKey: '$ref'})} />

        <Button onClick={open}>This button is outside of the dropzone</Button>
      </StyledRoot>
    )}
  </Dropzone>
);
```

## Exports

* `Unstable_FileUploader`
* `StyledRoot`
* `StyledFileDragAndDrop`
* `StyledContentMessage`
* `StyledContentSeparator`
* `StyledFilesList`
* `StyledAcceptedFile`
* `StyledRejectedFile`
* `StyledHiddenInput`

## `Unstable_FileUploader` API
* This component aligns to the api provided by [`react-dropzone`](https://react-dropzone.netlify.com/). Please
  refer to their documentation.
* `overrides?: {Root, ContentContainer, FileDragAndDrop, FileSelectButton, Input} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `FileDragAndDrop?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ContentMessage?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ContentSeparator?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `FilesList?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `AcceptedFile?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `RejectedFile?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `HiddenInput?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledRoot`, `StyledFileDragAndDrop`, `StyledContentMessage`, `StyledContentSeparator`, `StyledFilesList`,
`StyledAcceptedFile`, `StyledRejectedFile`, `StyledHiddenInput`

* `$isDisabled: boolean`
* `$isDragActive: boolean`
* `$isDragAccept: boolean`
* `$isDragReject: boolean`
* `$isFocused: boolean`
* `$theme: theme`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

[react-dropzone](https://react-dropzone.netlify.com/)

## Accessibility

* The "Browse files" button will have `role="button"` set.
* "Browse files" button will also have `aria-controls="fileupload"` set.
* For the keyboard support and navigation "Browse files" button needs distinctive focus styles and `cursor: pointer` on hover.
