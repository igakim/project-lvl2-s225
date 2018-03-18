import plain from './plain';
import tree from './default';
import json from './json';

const renderers = {
  plain,
  json,
  tree,
};

export const getRenderList = () => Object.keys(renderers).join(', ');

export const getRender = (format = 'tree') => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown option or format: ${format}`);
  }
  return render;
};
