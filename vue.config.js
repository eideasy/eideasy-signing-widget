const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    const svgRule = config.module.rule('svg');

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()

    // add replacement loader(s)
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 102400 }));
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/styles/_functions.scss";
        @import "@/styles/_variables.scss";
        @import "@/styles/_util.scss";
        `,
      }
    }
  },
  pages: {
    'eideasy-widget': {
      entry: 'src/main.js',
      filename: 'index.html'
    }
  }
  /*
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
   */
};
