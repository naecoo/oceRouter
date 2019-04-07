
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'oceRouter',
    sourcemap: true,
    sourcemapFile: './dist/index.js.map'
  }
}