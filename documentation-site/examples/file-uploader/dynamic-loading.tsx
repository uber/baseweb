import * as React from "react";
import { FileUploader, type FileRow } from "baseui/file-uploader";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);

  // Fake an upload process and mock the amount of time it takes each file to load
  // For a real-world scenario, replace simulateFileProgressUpdates with application upload logic
  const simulateFileProgressUpdates = (
    fileToProcess: File,
    fileToProcessId: string,
    fileRows: FileRow[],
    resolve: ({
      errorMessage,
      fileInfo,
    }: {
      errorMessage: string | null;
      fileInfo?: any;
    }) => void,
  ) => {
    const fileRowsCopy: FileRow[] = [...fileRows];
    let indexOfFileToUpdate = fileRowsCopy.findIndex(
      (fileRow: FileRow) => fileRow.id === fileToProcessId,
    );
    let numberOfMockedLoadingSteps = 5 - (indexOfFileToUpdate % 3);
    let mockedTotalLoadingTime = indexOfFileToUpdate % 2 === 0 ? 10000 : 8000;
    for (let i = 0; i <= numberOfMockedLoadingSteps; i++) {
      if (i === numberOfMockedLoadingSteps) {
        // Simulates an onSuccess event
        setTimeout(() => {
          resolve({ errorMessage: null });
        }, mockedTotalLoadingTime);
      } else {
        // Simulates an onLoading event
        setTimeout(
          () => {
            fileRowsCopy[indexOfFileToUpdate].progressAmount =
              (i / numberOfMockedLoadingSteps) * 100;
            setFileRows([...fileRowsCopy]);
          },
          (i / numberOfMockedLoadingSteps) * mockedTotalLoadingTime,
        );
      }
    }
  };

  return (
    <FileUploader
      fileRows={fileRows}
      hint={
        "Try uploading multiple files at once to see the progress bar upload independently for each file"
      }
      processFileOnDrop={(fileToProcess, fileToProcessId, newFileRows) => {
        return new Promise((resolve) => {
          simulateFileProgressUpdates(
            fileToProcess,
            fileToProcessId,
            newFileRows,
            resolve,
          );
        });
      }}
      progressAmountStartValue={0}
      setFileRows={setFileRows}
    />
  );
}
