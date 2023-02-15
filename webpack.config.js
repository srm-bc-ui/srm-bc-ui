const path = require('path');
// 提取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 当前命令所在的目录
module.exports = {
  mode: 'development', // 开发模式不压缩
  devtool: false, // 关闭生成sourcemap
  entry: {
    srm: './index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js', // 打包后的文件名
    library: {
      name: 'srm', // 打包后库的名字
      type: 'umd', // 打包后模块的格式 umd amd cmd commonjs window
    },
  },
  externals: {
    // 外部依赖 组件库的代码是不需要打包react和react-dom的
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 指定扩展名
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // 加厂商前缀
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      // webpack5中file-loader和url-loader已经废弃，内置支持，静态文件不再需要配置loader
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
