const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line import/extensions
const package = require('./package.json');

const { version } = package;

const config = {
  entry: {
    popup: path.join(__dirname, 'src/pages/popup/popup.tsx'),
    content: path.join(__dirname, 'src/scripts/content.ts'),
    options: path.join(__dirname, 'src/pages/options/options.tsx'),
    background: path.join(__dirname, 'src/scripts/background.ts'),
  },
  output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: 'public',
        to: '.',
        transform(content, absoluteFileName) {
          if (absoluteFileName.includes('options.html') || absoluteFileName.includes('manifest.json')) {
            let parsed = content.toString();
            const transformation = [
              {
                search: '__VERSION_NUMBER__',
                replace: version || '0.0.0',
              },
            ];

            for (let i = 0; i < transformation.length; i += 1) {
              parsed = parsed.replace(transformation[i].search, transformation[i].replace);
            }
            return Buffer.from(parsed, 'utf8');
          }
          return content;
        },
      }],
    }),
  ],
};

module.exports = config;
