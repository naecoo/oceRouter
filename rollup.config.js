
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'Router',
    sourcemap: true,
    sourcemapFile: './dist/index.js.map'
  }
}