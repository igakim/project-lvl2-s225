import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parse';

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
  const format = path.extname(beforePath);
  const parse = getParser(format);
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  return `{\n${Array.from(united).map(el => toString(el, parsedAfter, parsedBefore)).join('')}}`;
};
