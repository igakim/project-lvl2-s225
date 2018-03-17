import plain from './plain';
import def from './default';

const renderers = {
  plain,
};

export default (format) => {
  const render = format ? renderers[format] : def;
  if (!render) {
    throw new Error(`unkown option or format: ${format}`);
  }
  return render;
};
