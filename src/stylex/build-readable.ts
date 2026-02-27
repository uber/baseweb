/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { lightThemeCSS, darkThemeCSS } from './human-readable.css';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Build script to generate human-readable CSS custom properties file
 */
function buildHumanReadableCSS() {
  const cssContent = `/**
 * Base UI Design System - Human-Readable CSS Custom Properties
 * Generated from token definitions
 */

${lightThemeCSS}

${darkThemeCSS}
`;

  const outputPath = path.join(process.cwd(), 'dist', 'baseui-theme-readable.css');

  // Ensure dist directory exists
  const distDir = path.dirname(outputPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, cssContent, 'utf-8');

  console.log(`✓ Generated human-readable CSS: ${outputPath}`);
  console.log(`  Size: ${(cssContent.length / 1024).toFixed(2)} KB`);
}

// Run if executed directly
if (require.main === module) {
  buildHumanReadableCSS();
}

export { buildHumanReadableCSS };
