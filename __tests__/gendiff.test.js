import fs from 'fs';
import genDiff from '../src';


const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

test('compare two json', () => {
  expect(genDiff(beforeJSON, afterJSON)).toBe(expected);
});


const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

test('compare two yaml', () => {
  expect(genDiff(beforeYAML, afterYAML).toBe(expected));
});
