const fs = require('fs');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const ENGLISH_FILE = 'en.json';
const toJsonString = obj => (`${JSON.stringify(obj, null, 2)}\n`);

['desktop', 'mobile'].forEach((device) => {
  const has = Object.prototype.hasOwnProperty;
  const messages = glob.sync(`build/messages/${device}/**/*.json`)
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
