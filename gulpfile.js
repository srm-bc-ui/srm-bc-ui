const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const gulpless = require('gulp-less');
const through2 = require('through2');

const cwd = process.cwd();
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
  noUnusedParameters: true, // 不能有未使用的参数
  noUnusedLocals: true, // 不能有未使用的本地变量
  strictNullChecks: true, // 严格的null检查
  target: 'es6', // 编译目标
  jsx: 'react', // jsx如何处理：保留 react变成React.createElement
  moduleResolution: 'node', // 模块的查找规则：node
  declaration: true, // 生成声明文件 d.ts
  allowSyntheticDefaultImports: true, // 允许默认导入
  ...compilerOptions,
};

const babelConfig = require('./babel.config');

// 要编译的文件
// glob文件匹配模式，类似于正则
const source = [
  'components/**/*.{js,ts,tsx,jsx}',
  '!components/**/*.stories.{js,ts,tsx,jsx}',
  '!components/**/__test__/**/*',
];
function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}
const base = getProjectPath('components');
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');
function compile(modules) {
  const targetDir = modules ? libDir : esDir;
  rimraf.sync(targetDir); // 删除老的内容
  // 把文件匹配模式传给gulp，gulp会按这个模式把文件匹配出来
  // 会生成2个流，一个是js，一个是类型声明d.ts
  const copyCss = gulp.src(['components/**/*.{less,css}']);
  const transeCss = gulp.src(['components/**/*.less']).pipe(gulpless());
  const { js, dts } = gulp
    .src(source, { base })
    .pipe(
      through2.obj(function (file, encoding, next) {
        const data = file.contents
          .toString()
          .replace(/import.+?\.less["']/g, (str) => str.replace('.less', '.css'));
        file.contents = Buffer.from(data);
        this.push(file);
        next();
      }),
    )
    .pipe(ts(tsConfig));
  let jsStream = js;
  if (modules) {
    // 如果要es5，就需要babel转译
    jsStream = js.pipe(babel(babelConfig));
  }
  const assets = gulp.src(['components/**/*.@(png|svg)']);
  return merge2([transeCss, jsStream, dts, assets, copyCss]);
}

gulp.task('compile-with-es', (done) => {
  compile(false).pipe(gulp.dest(esDir)).on('finish', done);
});
gulp.task('compile-with-lib', (done) => {
  compile(true).pipe(gulp.dest(libDir)).on('finish', done);
});
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));
