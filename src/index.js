import _ from 'lodash';
import fs from 'fs';

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
  const before = fs.readFileSync(beforePath);
  const after = fs.readFileSync(afterPath);
  const parsedBefore = JSON.parse(before);
  const parsedAfter = JSON.parse(after);
  const beforeKeys = _.keys(parsedBefore);
  const afterKeys = _.keys(parsedAfter);
  const concatedKeys = beforeKeys.concat(afterKeys);
  const unique = new Set(concatedKeys);
  return `{\n${Array.from(unique).map(el => toString(el, parsedAfter, parsedBefore)).join('')}}`;
};
