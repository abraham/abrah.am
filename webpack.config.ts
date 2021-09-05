/* eslint-env node */

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { InjectManifest } from 'workbox-webpack-plugin';
import data from './src/data.json';

const production = process.env.NODE_ENV === 'production';
const mode = production ? 'production' : 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: './index.ts',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: false,
    port: 5000,
  },
  output: {
    crossOriginLoading: 'anonymous',
    chunkFilename: '[name]-[contenthash].js',
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
    new HtmlWebpackPlugin({
      excludeAssets: [/style-.*\.js/],
      filename: 'index.html',
      inlineSource: '.(css)$',
      template: path.resolve(__dirname, 'src', 'index.ejs'),
      templateParameters: data,
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src', 'sw.ts'),
      swDest: 'sw.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.txt',
          to: '.',
        },
        {
          from: '*.ico',
          to: '.',
        },
        {
          from: '*.png',
          to: '.',
        },
        {
          from: 'img/*',
          to: '.',
        },
        {
          from: '*.json',
          to: '.',
        },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      /* Support Workbox using async/await */
      {
        test: /\.m?js$/,
        include: /node_modules\/workbox-/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
};
