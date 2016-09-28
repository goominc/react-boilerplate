// Copyright (C) 2016 Goom Inc. All rights reserved.

/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');

const MESSAGES_PATTERN = './build/messages/**/*.json';
const I18N_DIR = './i18n';
const TRANSLATED_TEXT_PATTERN = `${I18N_DIR}/*.json`;
const ENGLISH_FILE = 'en.json';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const has = Object.prototype.hasOwnProperty;
const messages = glob.sync(MESSAGES_PATTERN)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (has.call(collection, id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      collection[id] = defaultMessage; // eslint-disable-line no-param-reassign
    });
    return collection;
  }, {});

glob.sync(TRANSLATED_TEXT_PATTERN).forEach((filename) => {
  if (path.basename(filename) === ENGLISH_FILE) {
    return;
  }
  const file = fs.readFileSync(filename, 'utf8');
  const data = JSON.parse(file);
  const merged = Object.assign({}, messages);
  Object.keys(messages).forEach((key) => {
    if (data[key]) {
      merged[key] = data[key];
    }
  });
  fs.writeFileSync(filename, JSON.stringify(merged, null, 2));
});

mkdirp.sync(I18N_DIR);
fs.writeFileSync(path.join(I18N_DIR, ENGLISH_FILE), JSON.stringify(messages, null, 2));
