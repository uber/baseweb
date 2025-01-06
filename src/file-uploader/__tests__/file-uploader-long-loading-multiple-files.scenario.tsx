/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { type FileRow, FileUploader } from '..';

export function Scenario() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);

  const simulateFileProgressUpdates = (
    fileToProcess: File,
    fileToProcessId: string,
    fileRows: FileRow[],
    resolve: (file: File) => void
  ) => {
    const fileRowsCopy: FileRow[] = [...fileRows];
    let indexOfFileToUpdate = fileRowsCopy.findIndex(
      (fileRow: FileRow) => fileRow.id === fileToProcessId
    );
    let numberOfMockedLoadingSteps = 5 - (indexOfFileToUpdate % 3);
    let mockedTotalLoadingTime = indexOfFileToUpdate % 2 === 0 ? 10000 : 8000;
    for (let i = 0; i <= numberOfMockedLoadingSteps; i++) {
      if (i === numberOfMockedLoadingSteps) {
        // Simulates an onSuccess event
        setTimeout(() => {
          resolve(fileToProcess);
        }, mockedTotalLoadingTime);
      } else {
        // Simulates an onLoading event
        setTimeout(() => {
          fileRowsCopy[indexOfFileToUpdate].progressAmount = (i / numberOfMockedLoadingSteps) * 100;
          setFileRows([...fileRowsCopy]);
        }, (i / numberOfMockedLoadingSteps) * mockedTotalLoadingTime);
      }
    }
  };

  return (
    <FileUploader
      fileRows={fileRows}
      hint={
        'Try uploading multiple files at once to see the progress bar upload independently for each file'
      }
      processFileOnDrop={(fileToProcess: File, fileToProcessId: string, fileRows: FileRow[]) => {
        return new Promise((resolve) => {
          simulateFileProgressUpdates(fileToProcess, fileToProcessId, fileRows, resolve);
        });
      }}
      progressAmountStartValue={0}
      setFileRows={setFileRows}
    />
  );
}
