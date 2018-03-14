import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': el => JSON.parse(el),
  '.yml': el => yaml.safeLoad(el),
  '.ini': el => ini.parse(el),
};

export default format => (data) => {
  const parse = parsers[format];
  return parse(data);
};
