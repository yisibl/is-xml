# is-xml

[![Build Status](https://travis-ci.org/yisibl/is-xml.svg?branch=master)](https://travis-ci.org/yisibl/is-xml)
[![NPM Downloads](https://img.shields.io/npm/dm/is-xml.svg?style=flat)](https://www.npmjs.com/package/is-xml)
[![NPM Version](http://img.shields.io/npm/v/is-xml.svg?style=flat)](https://www.npmjs.com/package/is-xml)
[![License](https://img.shields.io/npm/l/is-xml.svg?style=flat)](http://opensource.org/licenses/MIT)

> Check if a String/Buffer is XML(HTML/XHTML/SVG/MathML/XUL/XBL/RSS)

## Install

```sh
npm install --save is-xml
```

## Usage

```js
var isXML = require('is-xml');
```

### XML

```js
isXML('<message><warning>I am XML</warning></message>');
isXML(
    '<标题>一丝是谁？</标题>' +
    '<简介>当你们每天喊我「丝姐」的时候' +
    '我深深的沉浸在其中不能自拔</简介>'
);
// => true
```

### HTML

```js
isXML('<html>');
isXML('<html></html>');
isXML('<input type="text" />');
isXML('<img src="#" alt="img"/>');
// => true
```

### SVG

```js
isXML('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>');
isXML('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>');
// => true
```

### Emjio :joy:

```js
isXML('<p class="foo_bar-🙈🔞🙈" id="👻">');
isXML('<p 😂👻😂="foo_bar">');
isXML('<foo😘( ●─● )💓></foo😘( ●─● )💓>');
isXML('<p class="(ོ•̀⌄•́)ོ"></p>');
// => true
```

### [More test case](test/index.js)


## License

MIT © [yisibl](https://github.com/yisibl/) ([Weibo](http://weibo.com/jieorlin))
