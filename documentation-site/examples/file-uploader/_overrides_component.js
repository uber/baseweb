// @flow
import * as React from 'react';
import {FileUploader} from 'baseui/file-uploader';
import type {
  DropFilesEventHandlerT,
  OverridesT,
} from 'baseui/file-uploader';

export default class Uploader extends React.Component<
  {overrides: OverridesT},
  {progressAmount: number},
> {
  state = {progressAmount: 0};
  intervalId: IntervalID;

  handleDrop: DropFilesEventHandlerT = (
    acceptedFiles,
    rejectedFiles,
  ) => {
    // handle file upload...
    this.startProgress();
  };

  // startProgress method is only illustrative. Use the progress info returned
  // from your upload endpoint. If unavailable, do not provide a progressAmount.
  startProgress = () => {
    this.intervalId = setInterval(() => {
      if (this.state.progressAmount >= 100) {
        this.reset();
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
    this.setState({progressAmount: 0});
  };

  render() {
    return (
      <React.Fragment>
        <FileUploader
          onCancel={this.reset}
          onDrop={this.handleDrop}
          progressAmount={this.state.progressAmount}
          progressMessage={
            this.state.progressAmount
              ? `Uploading... ${this.state.progressAmount}% of 100%`
              : ''
          }
          overrides={this.props.overrides}
        />
        <br />
        <br />
        <FileUploader
          onCancel={this.reset}
          onDrop={this.handleDrop}
          progressAmount={this.state.progressAmount}
          errorMessage={'Something went wrong. Sorry!'}
          progressMessage={
            this.state.progressAmount
              ? `Uploading... ${this.state.progressAmount}% of 100%`
              : ''
          }
          overrides={this.props.overrides}
        />
      </React.Fragment>
    );
  }
}
