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

const template = {
  name: '',
  values: {
    before: '',
    after: '',
  },
  status: '',
  children: [],
};

export const genDiff = (beforePath, afterPath) => {
  const format = path.extname(beforePath);
  const parse = getParser(format);
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  return `{\n${united.map(el => toString(el, parsedAfter, parsedBefore)).join('')}}`;
};

export const generateAst = (beforePath, afterPath) => {
  const format = path.extname(beforePath);
  const parse = getParser(format);
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  return united.map((el) => {
    const name = el;
    const values = { before: parsedBefore[el], after: parsedAfter[el] };
    if (values.before === values.after) {
      return {
        ...template, status: 'unchanged', name, values,
      };
    } else if (!values.after) {
      return {
        ...template, status: 'deleted', name, values,
      };
    } else if (!values.before) {
      return {
        ...template, status: 'added', name, values,
      };
    }
    return {
      ...template, status: 'changed', name, values,
    };
  });
};
