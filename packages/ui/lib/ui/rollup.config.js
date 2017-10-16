import svelte from 'rollup-plugin-svelte'
import url from 'rollup-plugin-url'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import pkg from '../../package.json'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import liveReload from 'rollup-plugin-livereload'

const developmentMode = process.env.NODE_ENV === 'development'

const plugins = [
  url({
    limit: 1024 * 100,
    include: [
      'lib/fonts/*.ttf',
      'lib/ui/components/**/*.svg'
    ]
  }),
  svelte({
    include: 'lib/ui/components/**/*.html'
  }),
  babel({
    exclude: 'node_modules/**'
  })
]

const production = [
  uglify()
]

const development = [
  copy({
    'lib/ui/app.html': 'dist/index.html'
  }),
  serve('dist'),
  liveReload({
    watch: 'dist'
  })
]

const version = developmentMode ? 'snapshot' : `${pkg.version}.min`
export default {
  input: 'lib/ui/app.js',
  output: {
    file: `dist/bundle-${version}.js`,
    format: 'iife',
    name: 'bundle'
  },
  plugins: plugins.concat(developmentMode ? development : production)
}
