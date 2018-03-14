import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': el => JSON.parse(el),
  '.yml': el => yaml.safeLoad(el),
  '.ini': el => ini.parse(el),
};

const toString = (key, after, before) => {
  if (after[key] === before[key]) {
    return `    ${key}: ${after[key]}\n`;
  } else if (!after[key]) {
    return `  - ${key}: ${before[key]}\n`;
  } else if (!before[key]) {
    return `  + ${key}: ${after[key]}\n`;
  }
  return `  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}\n`;
};


export default (beforePath, afterPath) => {
  const extname = path.extname(beforePath);
  const parse = parsers[extname];
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  const unique = new Set(united);
  return `{\n${Array.from(unique).map(el => toString(el, parsedAfter, parsedBefore)).join('')}}`;
};
