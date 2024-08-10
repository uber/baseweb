import * as React from "react";
import { FileUploaderBasic } from "baseui/file-uploader-basic";
import { FileUploaderBasicOverrides } from "baseui/file-uploader-basic";

export default class Uploader extends React.Component<
  { overrides: FileUploaderBasicOverrides },
  { progressAmount: number }
> {
  state = { progressAmount: 0 };
  intervalId: number = 0;

  // startProgress method is only illustrative. Use the progress info returned
  // from your upload endpoint. If unavailable, do not provide a progressAmount.
  startProgress = () => {
    this.intervalId = window.setInterval(() => {
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
    this.setState({ progressAmount: 0 });
  };

  render() {
    return (
      <React.Fragment>
        <FileUploaderBasic
          onCancel={this.reset}
          onDrop={() => {
            // handle file upload...
            this.startProgress();
          }}
          progressAmount={this.state.progressAmount}
          progressMessage={
            this.state.progressAmount
              ? `Uploading... ${this.state.progressAmount}% of 100%`
              : ""
          }
          overrides={this.props.overrides}
        />
        <br />
        <br />
        <FileUploaderBasic
          onCancel={this.reset}
          onDrop={() => {
            // handle file upload...
            this.startProgress();
          }}
          progressAmount={this.state.progressAmount}
          errorMessage={"Something went wrong. Sorry!"}
          progressMessage={
            this.state.progressAmount
              ? `Uploading... ${this.state.progressAmount}% of 100%`
              : ""
          }
          overrides={this.props.overrides}
        />
      </React.Fragment>
    );
  }
}
