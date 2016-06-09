'use strict';

const _ = require('lodash');
const debug = require('debug');
const fs = require('fs');
const P = require('bluebird');
const path = require('path');

const dlog = debug('find');
P.promisifyAll(fs);

function markDir(f) {
  return fs.statAsync(f)
    .then((stats) => {
      if (stats.isDirectory()) {
        if (f.slice(-1) !== '/')
          f = f + '/';
        dlog('D: ', f);
      } else {
        dlog('F: ', f);
      }
      return f;
    });
}

function getDirectDescendents(dirPath) {
  dlog(`getDirectDescendents(${dirPath})`);
  return fs.readdirAsync(dirPath)
    .map((f) => path.join(dirPath, f))
    .map((f) => markDir(f));
}

function getAllDescendents(dirPath, includes, excludes) {
  dlog(`getAllDescendents(${dirPath})`);
  return getDirectDescendents(dirPath)
    .map((f) => {
      const isFile = f.slice(-1) !== '/';
      if (isFile) {
        if (!includes) {
          return f;
        } else {
          // If none of these patterns match f, we should omit the file
          const m = _.find(includes, (pat) => pat.test(f));
          if (!m) {
            dlog(`Skipping file ${f} which does not match any file-match pattern`);
            return undefined;
          } else {
            return f;
          }
        }
      } else {
        if (excludes) {
          // If any of these patterns do match f, we should omit the directory
          const m = _.find(excludes, (pat) => pat.test(f));
          if (m) {
            dlog(`Skipping directory ${f} which matches exclude pat ${m}`);
            return undefined;
          }
        }
        return getAllDescendents(f);
      }
    })
    .then((f) => _.flattenDeep(f))
    .then((f) => _.filter(f));
}

module.exports = {
  direct: getDirectDescendents,
  all: getAllDescendents
};
