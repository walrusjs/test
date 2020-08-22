<h1 align="center">@walrus/test</h1>

<h2 align="center">
A zero configuration test library based on jest.
</h2>

[![NPM version](https://img.shields.io/npm/v/@walrus/test.svg?style=flat)](https://npmjs.org/package/@walrus/test)
[![NPM downloads](https://img.shields.io/npm/dm/@walrus/test.svg?style=flat)](https://npmjs.org/package/@walrus/test)

## 📦 安装

- npm 安装

```bash
npm install @walrus/test --dev --save
```

- yarn 安装

```bash
yarn add @walrus/test --dev
```

## 🔨 使用

package.json 添加如下代码

```
scripts: {
  "test": "walrus-test"
}
```

命令行执行 `yarn test` || `npm run test`

## 🌟 一些常用小技巧

* 测试指定目录或指定文件的测试用例

```
# 测试指定的目录, 可使用正则
walrus-test path/dir

# 测试指定的文件, 可使用正则
walrus-test path/to/my-test.js
```
