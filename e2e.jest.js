module.exports = {
  verbose: true, // 显示日志
  testEnvironment: 'jest-environment-puppeteer', // 运行测试的环境
  setupFiles: ['./tests/setup.js'], // 建立文件，测试之前要执行的初始化文件
  testMatch: ['**/e2e/**/*.(spec|test).(js|ts|jsx|tsx)'], // 测试匹配哪些文件
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
