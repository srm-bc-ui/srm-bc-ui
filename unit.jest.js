module.exports = {
  verbose: true, // 显示日志
  testEnvironment: 'jsdom', // 运行测试的环境
  setupFiles: ['./tests/setup.js'], // 建立文件，测试之前要执行的初始化文件
  testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'], // 测试匹配哪些文件
  collectCoverage: true, // 收集测试覆盖率
  collectCoverageFrom: [
    'components/**/*.(js|ts|jsx|tsx)',
    '!components/**/*.stories.(js|ts|jsx|tsx)',
    '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
