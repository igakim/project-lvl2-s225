import genDiff from '../src';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const before = '__tests__/__fixtures__/before.json';
const after = '__tests__/__fixtures__/after.json';

test('compare two json', () => {
  expect(genDiff(before, after)).toBe(expected);
});
