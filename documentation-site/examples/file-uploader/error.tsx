import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';

export default class Uploader extends React.Component<
  {},
  {progressAmount: number; errorMessage: string}
> {
  state = {
    progressAmount: 0,
    errorMessage: '',
  };
  intervalId: number = 0;

  // startProgress method is only illustrative. Use the progress info returned
  // from your upload endpoint. If unavailable, do not provide a progressAmount.
  startProgress = () => {
    this.intervalId = window.setInterval(() => {
      if (this.state.progressAmount >= 40) {
        clearInterval(this.intervalId);
        this.setState({
          errorMessage: 'Upload failed... connection was lost.',
        });
      } else {
        this.setState({
          progressAmount: this.state.progressAmount + 10,
        });
      }
    }, 500);
  };

  // reset the component to its original state. use this to cancel/retry the upload.
  reset = () => {
    clearInterval(this.intervalId);
    this.setState({progressAmount: 0, errorMessage: ''});
  };

  render() {
    return (
      <FileUploader
        errorMessage={this.state.errorMessage}
        onCancel={this.reset}
        onDrop={() => {
          // handle file upload...
          this.startProgress();
        }}
        onRetry={this.reset}
        progressAmount={this.state.progressAmount}
        progressMessage={
          this.state.progressAmount
            ? `Uploading... ${this.state.progressAmount}% of 100%`
            : ''
        }
      />
    );
  }
}
