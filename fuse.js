const {
  FuseBox,
  Sparky,
  QuantumPlugin,
} = require('fuse-box')

const isProduction = process.env.NODE_ENV === 'production'

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  useTypescriptCompiler: true,
  allowSyntheticDefaultImports: true,
  target: "browser@esnext",
  globals: {
    'default': '*'
  },
  plugins: [
    isProduction && QuantumPlugin({
      containedAPI: true,
      ensureES5: false,
      uglify: true,
      bakeApiIntoBundle: "index",
    })
  ]
})

fuse.dev()

fuse.bundle("index").watch('*').hmr().instructions("> index.js")

fuse.run()
