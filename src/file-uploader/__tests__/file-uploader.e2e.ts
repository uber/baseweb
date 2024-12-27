/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@uber/playwright-test';
import { mount } from '../../test/integration';

const selectors = {
  button: '[data-baseweb="button"]',
  circleCheckFilledIcon: '[data-baseweb="file-uploader-circle-check-filled-icon"]',
  circleExclamationPointFilledIcon:
    '[data-baseweb="file-uploader-circle-exclamation-point-filled-icon"]',
  deleteButtonComponent: '[data-baseweb="file-uploader-delete-button-component"]',
  fileRows: '[data-baseweb="file-uploader-file-rows"]',
  fileRowColumn: '[data-baseweb="file-uploader-file-row-column"]',
  fileRowContent: '[data-baseweb="file-uploader-file-row-content"]',
  fileRowText: '[data-baseweb="file-uploader-file-row-text"]',
  fileRowFileName: '[data-baseweb="file-uploader-file-row-file-name"]',
  fileRowUploadMessage: '[data-baseweb="file-uploader-file-row-upload-message"]',
  fileRowUploadMessageText: '[data-baseweb="file-uploader-file-row-upload-message-text"]',
  fileUploader: '[data-baseweb="file-uploader"]',
  hint: '[data-baseweb="file-uploader-hint"]',
  imagePreviewThumbnail: '[data-baseweb="file-uploader-image-preview-thumbnail"]',
  itemPreviewContainer: '[data-baseweb="file-uploader-item-preview-container"]',
  label: '[data-baseweb="file-uploader-label"]',
  parentRoot: '[data-baseweb="file-uploader-parent-root"]',
  paperclipFilledIcon: '[data-baseweb="file-uploader-paperclip-filled-icon"]',
};

test.describe('file-uploader', () => {
  test('file-uploader passes basic a11y tests', async ({ page }) => {
    await mount(page, 'file-uploader--file-uploader');
  });

  test('file-uploader shows file row success on successful upload', async ({ page }) => {
    await mount(page, 'file-uploader--file-uploader');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.parentRoot);
    await page.waitForSelector(selectors.fileRows);
    await page.waitForSelector(selectors.fileRowColumn);
    await page.waitForSelector(selectors.fileRowContent);
    await page.waitForSelector(selectors.fileRowText);
    await page.waitForSelector(selectors.fileRowFileName);
    await page.waitForSelector(selectors.fileRowUploadMessage);
    await page.waitForSelector(selectors.circleCheckFilledIcon);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveText('file.txt');
    await expect(uploadMessageLocator).toHaveText('Upload successful');
  });

  test('file-uploader shows no files after upload and clicking on the trash can icon', async ({
    page,
  }) => {
    await mount(page, 'file-uploader--file-uploader');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.circleCheckFilledIcon);
    await page.click(selectors.deleteButtonComponent);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    await expect(fileNameLocator).toHaveCount(0);
  });

  test('file-uploader shows itemPreview for non image files', async ({ page }) => {
    await mount(page, 'file-uploader--item-preview');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.itemPreviewContainer);
    await page.waitForSelector(selectors.paperclipFilledIcon);
  });

  test('file-uploader shows itemPreview for image files', async ({ page }) => {
    await mount(page, 'file-uploader--item-preview');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.png',
      mimeType: 'image/png',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.itemPreviewContainer);
    await page.waitForSelector(selectors.imagePreviewThumbnail);
  });

  test('file-uploader shows label and hint', async ({ page }) => {
    await mount(page, 'file-uploader--label-hint');
    await page.waitForSelector(selectors.hint);
    await page.waitForSelector(selectors.label);
    const hintLocator = page.locator(selectors.hint);
    const labelLocator = page.locator(selectors.label);
    await expect(hintLocator).toHaveText('Test hint');
    await expect(labelLocator).toHaveText('Test label');
  });

  test('file-uploader shows file row loading on long loading upload', async ({ page }) => {
    await mount(page, 'file-uploader--long-loading');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.fileRowUploadMessage);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveText('file.txt');
    await expect(uploadMessageLocator).toHaveText('Description');
  });

  test('file-uploader shows file row loading on long loading multiple file upload', async ({
    page,
  }) => {
    await mount(page, 'file-uploader--long-loading-multiple-files');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles([
      {
        name: 'file-1.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is test'),
      },
      {
        name: 'file-2.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is test'),
      },
    ]);

    await page.waitForSelector(selectors.fileRowUploadMessage);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveCount(2);
    await expect(uploadMessageLocator).toHaveCount(2);
    await expect(fileNameLocator.nth(0)).toHaveText('file-1.txt');
    await expect(fileNameLocator.nth(1)).toHaveText('file-2.txt');
    await expect(uploadMessageLocator.nth(0)).toHaveText('Description');
    await expect(uploadMessageLocator.nth(1)).toHaveText('Description');
  });

  test('file-uploader shows file row too small error on erroneous upload', async ({ page }) => {
    await mount(page, 'file-uploader--upload-restrictions');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is test'),
    });

    await page.waitForSelector(selectors.circleExclamationPointFilledIcon);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveText('file.txt');
    await expect(uploadMessageLocator).toHaveText(
      'Upload failed: file size must be greater than 20 KB'
    );
  });

  test('file-uploader shows file row too large error on erroneous upload', async ({ page }) => {
    await mount(page, 'file-uploader--upload-restrictions');

    let fileContent = '';
    for (let i = 0; i < 100001; i++) {
      fileContent += 'a';
    }

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from(fileContent),
    });

    await page.waitForSelector(selectors.circleExclamationPointFilledIcon);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveText('file.txt');
    await expect(uploadMessageLocator).toHaveText(
      'Upload failed: file size must be less than 100 KB'
    );
  });

  test('file-uploader shows file row not accepted error on erroneous upload', async ({ page }) => {
    await mount(page, 'file-uploader--upload-restrictions');

    let fileContent = '';
    for (let i = 0; i < 20000; i++) {
      fileContent += 'a';
    }

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from(fileContent),
    });

    await page.waitForSelector(selectors.circleExclamationPointFilledIcon);
    const fileNameLocator = page.locator(selectors.fileRowFileName);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText);
    await expect(fileNameLocator).toHaveText('file.txt');
    await expect(uploadMessageLocator).toHaveText(
      'Upload failed: file type of text/plain is not accepted'
    );
  });

  test('file-uploader shows too many files error when too many files are uploaded', async ({
    page,
  }) => {
    await mount(page, 'file-uploader--upload-restrictions');

    let fileContent = '';
    for (let i = 0; i < 20000; i++) {
      fileContent += 'a';
    }

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click(selectors.button);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles([
      {
        name: 'file0.png',
        mimeType: 'image/png',
        buffer: Buffer.from(fileContent),
      },
      {
        name: 'file1.png',
        mimeType: 'image/png',
        buffer: Buffer.from(fileContent),
      },
      {
        name: 'file2.png',
        mimeType: 'image/png',
        buffer: Buffer.from(fileContent),
      },
      {
        name: 'file3.png',
        mimeType: 'image/png',
        buffer: Buffer.from(fileContent),
      },
    ]);

    await page.waitForSelector(selectors.circleExclamationPointFilledIcon);
    const file0NameLocator = page.locator(selectors.fileRowFileName).nth(0);
    const file1NameLocator = page.locator(selectors.fileRowFileName).nth(1);
    const file2NameLocator = page.locator(selectors.fileRowFileName).nth(2);
    const file3NameLocator = page.locator(selectors.fileRowFileName).nth(3);
    const uploadMessageLocator = page.locator(selectors.fileRowUploadMessageText).nth(3);
    await expect(file0NameLocator).toHaveText('file0.png');
    await expect(file1NameLocator).toHaveText('file1.png');
    await expect(file2NameLocator).toHaveText('file2.png');
    await expect(file3NameLocator).toHaveText('file3.png');
    await expect(uploadMessageLocator).toHaveText(
      'Upload failed: cannot process more than 3 file(s)'
    );
  });
});
