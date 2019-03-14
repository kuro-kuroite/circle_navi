/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// NOTE: npm-scripts is used only development
/* eslint-disable import/no-extraneous-dependencies */
import { runESLint } from '../eslint';

console.log('Linting changed files...');

if (runESLint({ onlyChanged: true })) {
  console.log('Lint passed for changed files.');
} else {
  console.log('Lint failed for changed files.');
  process.exit(1);
}
