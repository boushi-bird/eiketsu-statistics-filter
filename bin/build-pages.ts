#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import fse from 'fs-extra';
import jsYaml from 'js-yaml';

import { charset, distDir } from './config';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const copySrcDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fse.copySync(copySrcDir, distDir);

const srcConfigPath = path.resolve(copySrcDir, '_config.yml');
const distConfigPath = path.resolve(distDir, '_config.yml');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conf = jsYaml.load(fs.readFileSync(srcConfigPath, charset)) as any;

if (process.env.GH_PAGES_URL) {
  conf.url = process.env.GH_PAGES_URL;
}

if (process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID) {
  conf.google_tag_manager = process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID;
}

fs.writeFileSync(distConfigPath, jsYaml.dump(conf), charset);
