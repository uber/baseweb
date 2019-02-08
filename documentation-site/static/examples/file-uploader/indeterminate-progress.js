import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';

export default class Uploader extends React.Component {
  state = {uploading: false};

  handleDrop = (acceptedFiles, rejectedFiles) => {
    // handle file upload...
    this.startProgress();
  };

  // startProgress method is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  startProgress = () => {
    this.setState({uploading: true});
    this.timeoutId = setTimeout(() => {
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
        onDrop={this.handleDrop}
        progressMessage={this.state.uploading && `Uploading... hang tight.`}
      />
    );
  }
}
