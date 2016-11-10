/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const stringify = require('json-stable-stringify');

const { flattened } = require('../common/i18n/messages');

const commonDescriptors = [];
Object.keys(flattened).forEach(key => commonDescriptors.push({
  id: key,
  defaultMessage: flattened[key],
}));

const ENGLISH_FILE = 'en.json';
const toJsonString = obj => (`${stringify(obj, { space: '  ' })}\n`);

['desktop', 'mobile'].forEach((device) => {
  const has = Object.prototype.hasOwnProperty;
  const messages = glob.sync(`build/messages/${device}/**/*.json`)
    .map(filename => fs.readFileSync(filename, 'utf8'))
    .map(file => JSON.parse(file))
    .concat([commonDescriptors])
    .reduce((collection, descriptors) => {
      descriptors.forEach(({ id, defaultMessage }) => {
        if (has.call(collection, id)) {
          throw new Error(`Duplicate message id: ${id}`);
        }
        collection[id] = defaultMessage; // eslint-disable-line no-param-reassign
      });
      return collection;
    }, {});

  const outputDir = `${device}/messages`;
  glob.sync(`${outputDir}/*.json`).forEach((filename) => {
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
    fs.writeFileSync(filename, toJsonString(merged));
  });

  mkdirp.sync(outputDir);
  fs.writeFileSync(path.join(outputDir, ENGLISH_FILE), toJsonString(messages));
});
