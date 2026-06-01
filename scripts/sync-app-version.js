#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const DEFAULT_APP_PACKAGE = path.resolve(__dirname, '..', '..', '..', 'BrainChain', 'app', 'package.json');
const APP_PACKAGE = process.env.BRAINCHAIN_APP_PACKAGE
  ? path.resolve(process.env.BRAINCHAIN_APP_PACKAGE)
  : DEFAULT_APP_PACKAGE;
const CHANNEL = process.env.BRAINCHAIN_RELEASE_CHANNEL || 'Alpha';

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Could not find JSON file: ${filePath}. ` +
      'Set BRAINCHAIN_APP_PACKAGE to the app package.json path if the default path changed.'
    );
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeIfChanged(filePath, next) {
  const current = fs.readFileSync(filePath, 'utf8');
  if (current === next) return false;
  fs.writeFileSync(filePath, next);
  return true;
}

function assertVersion(version) {
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(`Invalid app version in ${APP_PACKAGE}: ${version}`);
  }
}

function updateVersionModule(version) {
  const filePath = path.join(SITE_ROOT, 'js', 'version.js');
  const current = fs.readFileSync(filePath, 'utf8');
  const next = current
    .replace(/version: '[^']+'/, `version: '${version}'`)
    .replace(/channel: '[^']*'/, `channel: '${CHANNEL}'`);

  return writeIfChanged(filePath, next);
}

function updateVersionJson(version) {
  const filePath = path.join(SITE_ROOT, 'version.json');
  const next = JSON.stringify({ version, channel: CHANNEL }, null, 2) + '\n';

  return writeIfChanged(filePath, next);
}

function updateSitePackage(version) {
  const filePath = path.join(SITE_ROOT, 'package.json');
  const pkg = readJson(filePath);
  pkg.version = version;
  const next = JSON.stringify(pkg, null, 2) + '\n';

  return writeIfChanged(filePath, next);
}

function updateFallbackLabels(version) {
  const display = `${version} ${CHANNEL}`.trim();
  const files = [
    path.join(SITE_ROOT, 'index.html'),
    path.join(SITE_ROOT, 'product.html'),
    path.join(SITE_ROOT, 'js', 'cockpit.js'),
    path.join(SITE_ROOT, 'js', 'projects-demo.js'),
  ];

  const replacements = [
    [/BrainChain Orchestrator • v?\d+\.\d+\.\d+(?:\s+Alpha)?/g, `BrainChain Orchestrator • ${display}`],
    [/BRAINCHAIN\* · v?\d+\.\d+\.\d+(?: · ALPHA|\s+Alpha)?/g, `BRAINCHAIN* · ${display}`],
    [/Build in public · v?\d+\.\d+\.\d+(?:\s+Alpha)?/g, `Build in public · ${display}`],
    [/© 2026 BrainChain Orchestrator · v?\d+\.\d+\.\d+(?:\s+Alpha)?/g, `© 2026 BrainChain Orchestrator · ${display}`],
    [/BrainChain Orchestrator · v?\d+\.\d+\.\d+(?:\s+Alpha)?/g, `BrainChain Orchestrator · ${display}`],
    [/BrainChain · v?\d+\.\d+\.\d+(?:\s+Alpha)?/g, `BrainChain · ${display}`],
    [/'\d+\.\d+\.\d+(?:\s+Alpha)?'/g, `'${display}'`],
  ];

  let changed = 0;
  files.forEach((filePath) => {
    let next = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(([pattern, value]) => {
      next = next.replace(pattern, value);
    });
    if (writeIfChanged(filePath, next)) changed += 1;
  });
  return changed;
}

const appPackage = readJson(APP_PACKAGE);
assertVersion(appPackage.version);

const jsonChanged = updateVersionJson(appPackage.version);
const moduleChanged = updateVersionModule(appPackage.version);
const packageChanged = updateSitePackage(appPackage.version);
const fallbackChanged = updateFallbackLabels(appPackage.version);

console.log(
  `Site version synced to ${appPackage.version} ${CHANNEL} from ${APP_PACKAGE}. ` +
  `Files changed: ${fallbackChanged + (jsonChanged ? 1 : 0) + (moduleChanged ? 1 : 0) + (packageChanged ? 1 : 0)}.`
);
