# TODOs

## 1 remove useless dependencies(has fixed)

run `depcheck` and get

refrence:
- https://www.pluralsight.com/guides/how-to-remove-unused-dependencies-in-react
- https://simondosda.github.io/posts/2021-05-10-eslint-imports.html
- https://dev.to/manitej/remove-unused-npm-modules-in-less-than-30-seconds-4g8k

更新后发现报错，原因是 eslint 版本升级造成的，需要更新 eslintrc @babel/eslint-parser 依赖

https://stackoverflow.com/questions/70386909/problem-with-babel-eslint-parsing-error-require-of-es-module

## 自动生成 eslint 配置文件

npm init @eslint/config

参考 https://www.npmjs.com/package/eslint#installation-and-usage
