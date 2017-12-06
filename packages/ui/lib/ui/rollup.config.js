import svelte from 'rollup-plugin-svelte'
import url from 'rollup-plugin-url'
import babel from 'rollup-plugin-babel'
import pkg from '../../package.json'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import liveReload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-postcss'

const developmentMode = process.env.NODE_ENV === 'development'

const plugins = [
  resolve(),
  commonjs({
    include: [
      'node_modules/nidus'
    ],
  }),
  css(),
  url({
    limit: 1024 * 100,
    include: [
      'lib/fonts/*.ttf',
      'lib/ui/components/**/*.svg'
    ]
  }),
  svelte({
    include: 'lib/ui/components/**/*.html',
    store: true
  }),
  babel({
    include: 'node_modules/nidus'
  })
]

function getDevelopmentPlugins () {
  return [
    copy({
      'lib/ui/app.html': 'dist/index.html'
    }),
    serve('dist'),
    liveReload()
  ]
}

function getProductionPlugins () {
  return []
}

const version = developmentMode ? 'snapshot' : `${pkg.version}.min`
export default {
  input: 'lib/ui/app.js',
  output: {
    file: `dist/bundle-${version}.js`,
    format: 'iife',
    name: 'bundle'
  },
  plugins: plugins.concat(developmentMode ? getDevelopmentPlugins() : getProductionPlugins())
}
