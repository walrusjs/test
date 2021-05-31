import mockfs = require('mock-fs');
import { TransformOptions } from '@jest/transform';
import esbuildJest from '../src/index'

const { process } = esbuildJest.createTransformer({})

afterEach(() => {
  mockfs.restore()
})

test('ts file', () => {
  const content = `
    import names from './names'
    export function display() {
      return names
    }
  `
  const output = process(content, './index.ts', {} as TransformOptions);

  if (typeof output === 'string') {
    expect(output).toMatchSnapshot()
  } else {
    expect(output.code).toMatchSnapshot()
    expect(output.map).toMatchSnapshot()
  }
});
