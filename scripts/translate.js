/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const stringify = require('json-stable-stringify');

const { flattened } = require('../common/i18n/messages');

const TRANSLATED_DIR = 'common/i18n/translated';
const ENGLISH_FILE = 'en.json';
const toJsonString = obj => (`${stringify(obj, { space: '  ' })}\n`);
const writeOutput = (messages, outputDir) => {
  glob.sync(`${outputDir}/*.json`).forEach((filename) => {
    const basename = path.basename(filename);
    if (basename === ENGLISH_FILE) {
      return;
    }

    let common = {};
    if (outputDir !== TRANSLATED_DIR) {
      common = JSON.parse(fs.readFileSync(path.join(TRANSLATED_DIR, basename)));
    }

    const old = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const merged = Object.assign({}, messages);
    Object.keys(messages).forEach((key) => {
      if (common[key]) {
        merged[key] = common[key];
      } else if (old[key]) {
        merged[key] = old[key];
      }
    });
    fs.writeFileSync(filename, toJsonString(merged));
  });

  mkdirp.sync(outputDir);
  fs.writeFileSync(path.join(outputDir, ENGLISH_FILE), toJsonString(messages));
};

writeOutput(flattened, TRANSLATED_DIR);

const commonDescriptors = [];
Object.keys(flattened).forEach(key => commonDescriptors.push({
  id: key,
  defaultMessage: flattened[key],
}));

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
  writeOutput(messages, `${device}/messages`);
});
