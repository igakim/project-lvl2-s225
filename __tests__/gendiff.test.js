import fs from 'fs';
import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

test('compare two json', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(beforeJSON, afterJSON)).toBe(expected);
});


const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

test('compare two yaml', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(beforeYAML, afterYAML)).toBe(expected);
});

const beforeINI = '__tests__/__fixtures__/before.ini';
const afterINI = '__tests__/__fixtures__/after.ini';

test('compare two ini', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(beforeINI, afterINI)).toBe(expected);
});

const beforeJSONNested = '__tests__/__fixtures__/beforeAst.json';
const afterJSONNested = '__tests__/__fixtures__/afterAst.json';

test('compare two nested json', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected2.txt', 'utf-8');
  expect(genDiff(beforeJSONNested, afterJSONNested)).toBe(expected);
});

const beforeYAMLNested = '__tests__/__fixtures__/beforeAst.yml';
const afterYAMLNested = '__tests__/__fixtures__/afterAst.yml';

test('compare two nested yaml', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected2.txt', 'utf-8');
  expect(genDiff(beforeJSONNested, afterJSONNested)).toBe(expected);
});

const beforeINILNested = '__tests__/__fixtures__/beforeAst.ini';
const afterININested = '__tests__/__fixtures__/afterAst.ini';

test('compare two nested ini', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected2.txt', 'utf-8');
  expect(genDiff(beforeJSONNested, afterJSONNested)).toBe(expected);
});
