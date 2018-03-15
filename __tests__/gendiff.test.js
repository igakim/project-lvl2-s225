import fs from 'fs';
import { genDiff, generateAst } from '../src';

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

test('parse ast tree', () => {
//  {
//     host: hexlet.io
//   + timeout: 20
//   - timeout: 50
//   - proxy: 123.234.53.22
//   + verbose: true
// }
  const expected = [
        {
          name: 'host',
          values: {
            before: 'hexlet.io',
            after: 'hexlet.io',
          },
          status: 'unchanged',
          children: [],
        },
        {
          name: 'timeout',
          values: {
            before: 50,
            after: 20,
          },
          status: 'changed',
          children: [],
        },
        {
          name: 'proxy',
          values: {
            before: '123.234.53.22',
            after: undefined,
          },
          status: 'deleted',
          children: [],
        },
        {
          name: 'verbose',
          values: {
            before: undefined,
            after: true,
          },
          status: 'added',
          children: [],
        }
      ];
  expect(generateAst(beforeJSON, afterJSON)).toEqual(expected);
});
