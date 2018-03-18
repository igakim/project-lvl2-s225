import plain from './plain';
import defaultRender from './default';
import json from './json';

const renderers = {
  plain,
  json,
  default: defaultRender,
};

export default (format = 'default') => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown option or format: ${format}`);
  }
  return render;
};
