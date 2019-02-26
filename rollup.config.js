import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import cssbundle from 'rollup-plugin-css-bundle';

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    cssbundle(),
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs(
      {
        namedExports: {
          'node_modules/react/index.js': [
            'cloneElement',
            'createContext',
            'Component',
            'createElement'
          ],
          'node_modules/react-dom/index.js': ['render', 'hydrate'],
          'node_modules/react-is/index.js': [
            'isElement',
            'isValidElementType',
            'ForwardRef'
          ]
        }
      }
    )
  ]
}
