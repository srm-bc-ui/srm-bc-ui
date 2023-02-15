module.exports = {
  presets: [
    '@babel/preset-react', // 把react编译成es5
    [
      '@babel/preset-env', // 把es6变成es5
      {
        modules: 'auto', // 模块化规范自动选择
        targets: {
          // 编译兼容的目标
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      // 支持typescript
      // 为什么不用ts-loader？ts-loader比较慢，一般会用babel-loader处理
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    // 提取一些编译运行时帮助方法
    // polyfill会对运行环境产生了污染，因为他会对浏览器全局对象进行赋值，例如直接修改window.Promise
    // （为什么使用@babel/plugin-transform-runtime的API转换功能而不使用polyfill？
    // @babel/plugin-transform-runtime一般是在js库中使用，如果js库使用polyfill，前端工程也使用polyfill，如果版本不同的话，就会出现问题
    // ）
    ['@babel/plugin-transform-runtime'],
  ],
};
