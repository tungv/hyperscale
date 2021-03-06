import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  format: 'cjs',
  plugins: [
    json(),
    babel()
  ],
  entry: 'src/index.js',
  dest: '_dist/hyperscale.js'
};
