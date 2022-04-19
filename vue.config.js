const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        hotOnly: true,
    },
    chainWebpack: (config) => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: {
        output: {
            filename: `js/[name].${new Date().getTime()
                }.js`,
            chunkFilename: `js/[name].${new Date().getTime()
                }.js`
        },
        devtool: 'cheap-module-eval-source-map'
    },
    outputDir: 'dist',
    publicPath: '/',
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass')
            },
        },
    }
}
