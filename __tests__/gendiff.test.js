import fs from 'fs';
import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

test('compare two json', () => {
  expect(genDiff(beforeJSON, afterJSON)).toBe(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
});


const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

test('compare two yaml', () => {
  expect(genDiff(beforeYAML, afterYAML)).toBe(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
});

const beforeINI = '__tests__/__fixtures__/before.ini';
const afterINI = '__tests__/__fixtures__/after.ini';

test('compare two ini', () => {
  expect(genDiff(beforeINI, afterINI)).toBe(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
});
