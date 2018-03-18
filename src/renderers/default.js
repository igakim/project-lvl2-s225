import _ from 'lodash';

const objToString = (o, depth) => {
  if (o instanceof Object) {
    const keys = Object.keys(o);
    const tabs = ' '.repeat((depth + 1) * 4);
    const closeBracketsTabs = ' '.repeat(depth * 4);
    const res = keys.reduce((acc, el) => `${acc}${tabs}${el}: ${o[el]}\n`, '');
    return `{\n${res}${closeBracketsTabs}}`;
  }

  return o;
};

const render = (ast, depth = 1) => {
  const tabs = ' '.repeat(depth * 4);

  const diffTabs = ' '.repeat((depth * 4) - 2);

  const closeBracketsTabs = ' '.repeat((depth * 4) - 4);

  const diff = ast.map((el) => {
    const valueAfter = objToString(el.valueAfter, depth);
    const valueBefore = objToString(el.valueBefore, depth);
    const { type, key, children } = el;

    switch (type) {
      case 'updated':
        return [`${diffTabs}+ ${key}: ${valueAfter}`, `${diffTabs}- ${key}: ${valueBefore}`];
      case 'added':
        return `${diffTabs}+ ${key}: ${valueAfter}`;
      case 'removed':
        return `${diffTabs}- ${key}: ${valueBefore}`;
      case 'nested':
        return `${tabs}${key}: ${render(children, depth + 1)}`;
      default:
        return `${tabs}${key}: ${valueAfter}`;
    }
  });

  return `{\n${_.flatten(diff).join('\n')}\n${closeBracketsTabs}}`;
};

export default render;
