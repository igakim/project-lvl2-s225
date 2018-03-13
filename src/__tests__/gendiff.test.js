import fs from 'fs';
import genDiff from '..';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const before = fs.readFileSync('src/__tests__/__fixtures__/before.json');
const after = fs.readFileSync('src/__tests__/__fixtures__/after.json');

test('compare two json', () => {
  expect(genDiff(before, after)).toBe(expected);
});
