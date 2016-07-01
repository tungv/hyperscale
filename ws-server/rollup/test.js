import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  format: 'cjs',
  plugins: [
    json(),
    commonjs({
      include: '_dist/primus.client.js'
    }),
    babel()
  ],
  entry: 'test/index.js',
  dest: 'test/.test.bundled.js'
};
