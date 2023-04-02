#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { minify } from 'terser';

import { charset, distDir } from './config';

import { SCRIPT_ID } from '../src/lib/defines';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pageUrl = new URL(process.env.GH_PAGES_URL || 'http://localhost:4173');
const appPath = process.env.APP_PATH || '/';

const appUrl = new URL(appPath, pageUrl);

const embedJsUrl = new URL('main.js', appUrl).toString();

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const srcBookmarkletFile = path.resolve(__dirname, '../bookmarklet/index.js');
const distBookmarkletFile = path.resolve(distDir, 'bookmarklet.js');

const content = fs.readFileSync(srcBookmarkletFile, charset);

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', SCRIPT_ID);

(async () => {
  const { code } = await minify(builtJs, {
    mangle: true,
    compress: {
      expression: true,
      evaluate: false,
      reduce_vars: false,
    },
  });
  if (!code) {
    return;
  }

  fs.writeFileSync(
    distBookmarkletFile,
    `javascript:${encodeURI(code)}\n`,
    charset
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
