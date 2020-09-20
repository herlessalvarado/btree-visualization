// config-overrides.js

const {
    override,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");


module.exports = override(
    fixBabelImports("babel-plugin-import", {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        ident: 'postcss',
        sourceMap: true, // should skip in production
        importLoaders: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
    })
);