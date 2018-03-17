import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parse';

const makeNode = (key, type, children, valueAfter, valueBefore) =>
  ({
    key,
    type,
    children,
    valueAfter,
    valueBefore,
  });

const makeAst = (parsedBefore, parsedAfter) => {
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  return united.map((el) => {
    if (parsedBefore[el] === parsedAfter[el]) {
      return makeNode(el, 'unchanged', [], parsedAfter[el], parsedBefore[el]);
    } else if (!parsedAfter[el]) {
      return makeNode(el, 'deleted', [], parsedAfter[el], parsedBefore[el]);
    } else if (!parsedBefore[el]) {
      return makeNode(el, 'added', [], parsedAfter[el]);
    } else if (parsedAfter[el] instanceof Object && parsedBefore[el] instanceof Object) {
      return makeNode(el, 'nested', makeAst(parsedBefore[el], parsedAfter[el]));
    }
    return makeNode(el, 'changed', [], parsedAfter[el], parsedBefore[el]);
  });
};

const objToString = (o, depth) => {
  if (o instanceof Object) {
    const keys = Object.keys(o);
    const res = keys.reduce((acc, el) => `${acc}${' '.repeat(4)}${el}: ${o[el]}\n`, '');
    return `{\n${' '.repeat(depth * 4)}${res}${' '.repeat(depth * 4)}}`;
  }
  return o;
};

const buildDiff = (el, depth) => {
  const after = objToString(el.valueAfter, depth);
  const before = objToString(el.valueBefore, depth);
  if (el.type === 'changed') {
    return `${' '.repeat((depth * 4) - 2)}+ ${el.key}: ${after}\n${' '.repeat((depth * 4) - 2)}- ${el.key}: ${before}\n`;
  } else if (el.type === 'added') {
    return `${' '.repeat((depth * 4) - 2)}+ ${el.key}: ${after}\n`;
  } else if (el.type === 'deleted') {
    return `${' '.repeat((depth * 4) - 2)}- ${el.key}: ${before}\n`;
  }
  return `${' '.repeat(depth * 4)}${el.key}: ${after}\n`;
};

const render = (ast, depth = 1) => {
  const ready = ast.reduce((acc, el) => {
    if (el.type === 'nested') {
      return `${acc}${' '.repeat(depth * 4)}${el.key}: ${render(el.children, depth + 1)}\n`;
    }
    return `${acc}${buildDiff(el, depth)}`;
  }, '');
  return `{\n${ready}${' '.repeat((depth * 4) - 4)}}`;
};

export default (beforePath, afterPath) => {
  const format = path.extname(beforePath);
  const parse = getParser(format);
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const ast = makeAst(parsedBefore, parsedAfter);
  return render(ast);
};
