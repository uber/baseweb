// @ts-nocheck
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  act,
  fireEvent,
  getAllByTestId,
  getByTestId,
  getByText,
  queryByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { FileUploader } from '..';
import locale from '../locale';

jest.mock('react-uid', () => ({
  uid: () => '1',
}));

jest.mock('../constants', () => ({
  ...jest.requireActual('../constants'),
  ARIA_LIVE_TIMEOUT_MS: 0,
}));

describe('FileUploader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders gracefully', () => {
    const { container } = render(<FileUploader />);
    expect(container).toBeDefined();
  });

  it('renders gracefully with different style override types', () => {
    const { container } = render(
      <>
        <FileUploader
          overrides={{
            ButtonComponent: {
              props: {
                overrides: {
                  BaseButton: {
                    style: {
                      backgroundColor: 'red',
                    },
                  },
                },
              },
            },
          }}
        />{' '}
        <FileUploader
          overrides={{
            ButtonComponent: {
              props: {
                overrides: {
                  BaseButton: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.warning600} solid`,
                      backgroundColor: $theme.colors.warning600,
                    }),
                  },
                },
              },
            },
          }}
        />
      </>
    );
    expect(container).toBeDefined();
  });

  it('throws errors when invalid props are passed in', () => {
    const original = console.error;
    console.error = jest.fn();
    render(
      <FileUploader
        // @ts-ignore
        onDrop={() => {}}
        onDropAccepted={() => {}}
        onDropRejected={() => {}}
      />
    );
    expect(console.error).toHaveBeenCalledTimes(3);
    expect(console.error).toHaveBeenNthCalledWith(1, 'onDrop is not a prop for FileUploader.');
    expect(console.error).toHaveBeenNthCalledWith(
      2,
      'onDropAccepted is not a prop for FileUploader.'
    );
    expect(console.error).toHaveBeenNthCalledWith(
      3,
      'onDropRejected is not a prop for FileUploader.'
    );
    console.error = original;
  });

  it('renders file rows when passed in props', () => {
    const mockFileAdded = new File(['(⌐□_□)'], 'test.jpg', {
      type: 'image/jpg',
    });
    const mockFileError = new File(['(⌐□_□)'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockFileProcessed = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const { container } = render(
      <FileUploader
        fileRows={[
          {
            errorMessage: null,
            file: mockFileAdded,
            id: '1',
            imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
            status: 'added',
          },
          {
            errorMessage: 'custom error message',
            file: mockFileError,
            id: '2',
            imagePreviewThumbnail: '',
            status: 'error',
          },
          {
            errorMessage: null,
            file: mockFileProcessed,
            id: '3',
            imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
            status: 'processed',
          },
        ]}
        setFileRows={() => {}}
      />
    );
    getByText(container, 'test.jpg');
    getByText(container, 'Description');
    getByText(container, 'test.pdf');
    getByText(container, 'Upload failed: custom error message');
    getByText(container, 'test.png');
    getByText(container, 'Upload successful');
  });

  it('calls setFileRows for accepted and rejected files and does not call invalid props', async () => {
    const original = console.error;
    console.error = jest.fn();
    const mockAcceptedFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockRejectedFile = new File(['(⌐□_□)'], 'test.json', {
      type: 'application/json',
    });
    const files = [mockAcceptedFile, mockRejectedFile];

    const mockFileRows = [];
    const mockSetFileRows = jest.fn();
    const onDropMock = jest.fn();
    const onDropAcceptedMock = jest.fn();
    const onDropRejectedMock = jest.fn();
    render(
      <FileUploader
        fileRows={mockFileRows}
        setFileRows={mockSetFileRows}
        // @ts-ignore
        onDrop={onDropMock}
        onDropAccepted={onDropAcceptedMock}
        onDropRejected={onDropRejectedMock}
      />
    );

    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), { target: { files } });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(5);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(5, [
        {
          errorMessage: null,
          file: mockAcceptedFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'processed',
        },
        {
          errorMessage: null,
          file: mockRejectedFile,
          id: '1',
          imagePreviewThumbnail: '',
          status: 'processed',
        },
      ]);

      // Expect invalid props to not have been called
      expect(onDropMock).not.toHaveBeenCalled();
      expect(onDropAcceptedMock).not.toHaveBeenCalled();
      expect(onDropRejectedMock).not.toHaveBeenCalled();
    });
    console.error = original;
  });

  it('renders hint if provided', () => {
    const { container } = render(
      <FileUploader fileRows={[]} hint={'test hint'} setFileRows={() => {}} />
    );
    getByText(container, 'test hint');
  });

  it('renders label if provided', () => {
    const { container } = render(
      <FileUploader fileRows={[]} label={'test label'} setFileRows={() => {}} />
    );
    getByText(container, 'test label');
  });

  it('renders label if disabled', () => {
    const { container } = render(
      <FileUploader disabled fileRows={[]} label={'test label'} setFileRows={() => {}} />
    );
    getByText(container, 'test label');
  });

  it('calls setFilesRows with error when too many files are added', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader fileRows={[]} maxFiles={0} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'cannot process more than 0 file(s)',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when file size is too small', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader fileRows={[]} minSize={50 * 1000} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'file size must be greater than 50 KB',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when file size is too big', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader fileRows={[]} maxSize={0} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'file size must be less than 0 bytes',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when file type is not accepted', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader accept={'image/jpg'} fileRows={[]} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'file type of image/png is not accepted',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when file type is unknown and not accepted', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.vdx', {
      type: '',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader accept={'image/jpg'} fileRows={[]} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(2);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(2, [
        {
          errorMessage: 'file type is not accepted',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: '',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when processFileOnDrop returns with an error', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockProcessFileOnDrop = jest.fn((file) =>
      Promise.resolve({ errorMessage: 'test error' })
    );
    const mockSetFileRows = jest.fn();
    render(
      <FileUploader
        fileRows={[]}
        processFileOnDrop={mockProcessFileOnDrop}
        setFileRows={mockSetFileRows}
      />
    );
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockProcessFileOnDrop).toHaveBeenCalledTimes(1);
      expect(mockProcessFileOnDrop).toHaveBeenCalledWith(mockFile);
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'test error',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFilesRows with success when processFileOnDrop returns with success', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockProcessFileOnDrop = jest.fn((file) =>
      Promise.resolve({ errorMessage: null, fileInfo: 'test-file-info' })
    );
    const mockSetFileRows = jest.fn();
    render(
      <FileUploader
        fileRows={[]}
        processFileOnDrop={mockProcessFileOnDrop}
        setFileRows={mockSetFileRows}
      />
    );
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockProcessFileOnDrop).toHaveBeenCalledTimes(1);
      expect(mockProcessFileOnDrop).toHaveBeenCalledWith(mockFile);
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: null,
          file: mockFile,
          fileInfo: 'test-file-info',
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'processed',
        },
      ]);
    });
  });

  it('calls setFilesRows with error when processFileOnDrop returns with undefined error', async () => {
    const original = console.error;
    console.error = jest.fn();
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockError = new Error();
    const mockProcessFileOnDrop = jest.fn((file) => Promise.reject(mockError));
    const mockSetFileRows = jest.fn();
    render(
      <FileUploader
        fileRows={[]}
        processFileOnDrop={mockProcessFileOnDrop}
        setFileRows={mockSetFileRows}
      />
    );
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockProcessFileOnDrop).toHaveBeenCalledTimes(1);
      expect(mockProcessFileOnDrop).toHaveBeenCalledWith(mockFile);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('error with processFileOnDrop', mockError);
      expect(mockSetFileRows).toHaveBeenCalledTimes(3);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(3, [
        {
          errorMessage: 'unknown processing error',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
          status: 'error',
        },
      ]);
    });
    console.error = original;
  });

  it('prevents drop when disabled is true', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(<FileUploader disabled fileRows={[]} setFileRows={mockSetFileRows} />);
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(0);
    });
  });

  it('prevents drop when files are loading and disabled is false', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    render(
      <FileUploader
        disabled={false}
        fileRows={[
          {
            errorMessage: null,
            file: mockFile,
            id: '1',
            imagePreviewThumbnail: '',
            status: 'added',
          },
        ]}
        setFileRows={mockSetFileRows}
      />
    );
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFile] },
      });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(0);
    });
  });

  it('hides delete button when any file is loading', async () => {
    const mockFileAdded = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockFileProcessed = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    const { container } = render(
      <FileUploader
        disabled={false}
        fileRows={[
          {
            errorMessage: null,
            file: mockFileAdded,
            id: '1',
            imagePreviewThumbnail: '',
            status: 'added',
          },
          {
            errorMessage: null,
            file: mockFileProcessed,
            id: '2',
            imagePreviewThumbnail: '',
            status: 'processed',
          },
        ]}
        setFileRows={mockSetFileRows}
        overrides={{ DeleteButtonComponent: { props: { 'data-testid': 'delete-button' } } }}
      />
    );
    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), {
        target: { files: [mockFileAdded] },
      });
    });
    await waitFor(() => {
      expect(queryByTestId(container, 'delete-button')).toBeNull();
    });
  });

  it('calls setFileRows when FileReader onerror is triggered', async () => {
    // @ts-ignore
    jest.spyOn(global, 'FileReader').mockImplementationOnce(function () {
      this.readAsDataURL = jest.fn(() => {
        if (this.onerror) {
          const errorEvent = new Event('error');
          this.onerror(errorEvent);
        }
      });
    });

    const mockFile = new File(['(⌐□_□)'], 'test.json', {
      type: 'application/json',
    });
    const files = [mockFile];

    const mockFileRows = [];
    const mockSetFileRows = jest.fn();
    render(<FileUploader fileRows={mockFileRows} setFileRows={mockSetFileRows} />);

    await act(async () => {
      await fireEvent.drop(screen.getByText(locale.contentMessage), { target: { files } });
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(2);
      expect(mockSetFileRows).toHaveBeenNthCalledWith(2, [
        {
          errorMessage: 'cannot read file',
          file: mockFile,
          id: '1',
          imagePreviewThumbnail: '',
          status: 'error',
        },
      ]);
    });
  });

  it('calls setFileRows when the remove file icon is clicked', async () => {
    const mockFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const mockSetFileRows = jest.fn();
    const { container } = render(
      <FileUploader
        fileRows={[
          {
            errorMessage: null,
            file: mockFile,
            id: '1',
            imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
            status: 'processed',
          },
        ]}
        setFileRows={mockSetFileRows}
        overrides={{ DeleteButtonComponent: { props: { 'data-testid': 'delete-button' } } }}
      />
    );

    await act(async () => {
      await fireEvent.click(getByTestId(container, 'delete-button'));
    });
    await waitFor(() => {
      expect(mockSetFileRows).toHaveBeenCalledTimes(1);
      expect(mockSetFileRows).toHaveBeenCalledWith([]);
    });
  });

  it('shows item preview when itemPreview is true', () => {
    const mockDocumentFile = new File(['(⌐□_□)'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockImageFile = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
    });
    const { container } = render(
      <FileUploader
        fileRows={[
          {
            errorMessage: null,
            file: mockDocumentFile,
            id: '1',
            imagePreviewThumbnail: '',
            status: 'processed',
          },
          {
            errorMessage: null,
            file: mockImageFile,
            id: '2',
            imagePreviewThumbnail: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
            status: 'processed',
          },
        ]}
        itemPreview
        setFileRows={() => {}}
        overrides={{
          ImagePreviewThumbnail: { props: { 'data-testid': 'image-thumbnail' } },
          ItemPreviewContainer: { props: { 'data-testid': 'item-preview' } },
          PaperclipFilledIcon: { props: { 'data-testid': 'paperclip' } },
        }}
      />
    );
    getByTestId(container, 'image-thumbnail');
    getAllByTestId(container, 'item-preview');
    getByTestId(container, 'paperclip');
  });
});
