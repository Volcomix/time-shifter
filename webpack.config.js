var path = require('path');
module.exports = {
    entry: './js/app.tsx',
    output: {
        path: path.resolve(__dirname, './js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    resolve: { 
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [ 
            { test: /\.tsx?$/, loaders: ['react-hot', 'ts'] },
            { test: /\.css$/, loaders: ['style', 'css'] }
        ]
    }
}