const render = (ast, path = '') =>
  ast.reduce((acc, el) => {
    const after = el.valueAfter instanceof Object ? 'complex value' : `'${el.valueAfter}'`;
    const before = el.valueBefore instanceof Object ? 'complex value' : `'${el.valueBefore}'`;
    const { type, key } = el;
    switch (type) {
      case 'updated':
        return acc.concat(`Property '${path}${key}' was updated. From ${before} to ${after}`);
      case 'added':
        return acc.concat(after === 'complex value' ?
          `Property '${path}${key}' was added with ${after}` :
          `Property '${path}${key}' was added with value: ${after}`);
      case 'removed':
        return acc.concat(`Property '${path}${key}' was removed`);
      case 'nested':
        return acc.concat(`${render(el.children, `${path}${key}.`)}`);
      default:
        return acc;
    }
  }, []).join('\n');


export default render;
