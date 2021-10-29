import PATH, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__filename, __dirname);

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/main.ts',
  stats: 'minimal',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: PATH.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  devServer: {
    port: 8000,
    open: true,
    static: [
      {
        directory: PATH.resolve(__dirname, 'public'),
      },
      {
        directory: PATH.resolve(__dirname, 'dist'),
      },
    ],
  },
};

export default config;
