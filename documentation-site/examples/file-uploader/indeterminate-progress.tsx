import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';

export default class Uploader extends React.Component<
  {},
  {uploading: boolean}
> {
  state = {uploading: false};
  timeoutId: number = 0;

  // startProgress method is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  startProgress = () => {
    this.setState({uploading: true});
    this.timeoutId = window.setTimeout(() => {
      this.reset();
    }, 4000);
  };

  // reset the component to its original state. use this to cancel/retry the upload.
  reset = () => {
    clearTimeout(this.timeoutId);
    this.setState({uploading: false});
  };

  render() {
    return (
      <FileUploader
        onCancel={this.reset}
        onDrop={() => {
          // handle file upload...
          this.startProgress();
        }}
        progressMessage={
          this.state.uploading ? `Uploading... hang tight.` : ''
        }
      />
    );
  }
}
