const path = require('path');
const packagejson = require('./package.json');

const dashLibraryName = packagejson.name.replace(/-/g, '_');

module.exports = (env, argv) => {

    let mode;


    // if user specified mode flag take that value
    if (argv && argv.mode) {
        mode = argv.mode;
    }

    // else if configuration object is already set (module.exports) use that value
    else if (module.exports && module.exports.mode) {
        mode = module.exports = mode;
    }

    // else take webpack default
    else {
        mode = 'production'; // webpack default
    }

    return {
        entry: {main: './src/lib/index.js'},
        output: {
            path: path.resolve(__dirname, dashLibraryName),
            filename: `${dashLibraryName}.${mode === 'development' ? 'dev' : 'min'}.js`,
            library: dashLibraryName,
            libraryTarget: 'window',
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'plotly.js': 'Plotly',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                    ],
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use:[
                        {
                            loader: 'url-loader'
                        }
                    ]
                }
            ],
        },
        devtool: mode === 'development' ? "eval-source-map" : 'none'
    }
};
