const path = require('path')

module.exports = {
    entry: {
        index: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
        edit: ['core-js/stable', 'regenerator-runtime/runtime', './src/edit.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename:'[name]-bundle.js'
    },
    // creating a new module that will load in babel to your webpack
    module: {
        rules: [ {
            // creates a new rule that will check all .js files that are not in the node_modules
            test: /\.js$/,
            exclude: /node_modules/,
            // once checked, it will run it the code through babel
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        } ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}