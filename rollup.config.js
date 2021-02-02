import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import svgr from '@svgr/rollup';
import image from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

const input = 'src/index.ts';
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'lodash/fp',
];

const plugins = [
  nodeResolve(),
  typescript({
    typescript: require('typescript'),
    allowJs: true,
    include: ['*.ts+(|x)', '**/*.ts+(|x)', '*.js+(|x)', '**/*.js+(|x)'],
    exclude: ['node_modules'],
  }),
  image(),
  svgr(),
  css({ output: 'dist/bundle.css' }),
  copy({
    targets: [
      { src: 'src/index.css', dest: 'dist' },
      { src: 'package.json', dest: 'dist' },
    ],
  }),
  terser(),
  bundleSize(),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: false,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false,
    },
    plugins,
    external,
  },
];
