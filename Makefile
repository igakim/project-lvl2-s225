install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm run test
test-coverage:
  npm test -- --coverage
diff:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/afterAst.json __tests__/__fixtures__/beforeAst.json
plainDiff:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/__fixtures__/afterAst.json __tests__/__fixtures__/beforeAst.json
jsonDiff:
	npm run babel-node -- src/bin/gendiff.js --format json __tests__/__fixtures__/afterAst.json __tests__/__fixtures__/beforeAst.json
