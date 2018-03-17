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
  const cntTabs = (depth * 4) - 2;
  const { type } = el;
  switch (type) {
    case 'updated':
      return `${' '.repeat(cntTabs)}+ ${el.key}: ${after}\n${' '.repeat(cntTabs)}- ${el.key}: ${before}\n`;
    case 'added':
      return `${' '.repeat(cntTabs)}+ ${el.key}: ${after}\n`;
    case 'removed':
      return `${' '.repeat(cntTabs)}- ${el.key}: ${before}\n`;
    default:
      return `${' '.repeat(depth * 4)}${el.key}: ${after}\n`;
  }
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

export default render;
