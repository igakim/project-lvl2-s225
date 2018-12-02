import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parse';
import { getRender } from './renderers';

const makeAst = (parsedBefore, parsedAfter) => {
  const united = _.union(_.keys(parsedBefore), _.keys(parsedAfter));
  return united.map((key) => {
    const valueAfter = parsedAfter[key];
    const valueBefore = parsedBefore[key];
    if (parsedBefore[key] === parsedAfter[key]) {
      return { key, type: 'unchanged', valueAfter };
    } else if (!(_.has(parsedAfter, key))) {
      return { key, type: 'removed', valueBefore };
    } else if (!(_.has(parsedBefore, key))) {
      return { key, type: 'added', valueAfter };
    } else if (valueAfter instanceof Object && valueBefore instanceof Object) {
      return { key, type: 'nested', children: makeAst(valueBefore, valueAfter) };
    }
    return {
      key,
      type: 'updated',
      valueAfter,
      valueBefore,
    };
  });
};

export default (beforePath, afterPath, option = {}) => {
  const render = getRender(option.format);
  const ext = path.extname(beforePath);
  const parse = getParser(ext);
  const before = fs.readFileSync(beforePath, 'utf-8');
  const after = fs.readFileSync(afterPath, 'utf-8');
  const parsedBefore = parse(before);
  const parsedAfter = parse(after);
  const ast = makeAst(parsedBefore, parsedAfter);
  return render(ast);
};
