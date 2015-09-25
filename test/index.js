'use strict';
var fs = require('fs');
var assert = require('assert');
var isXML = require('../');

it('Should detect XML', function() {
  assert(isXML(fs.readFileSync('test/fixture.xml')));
  assert(isXML(fs.readFileSync('test/fixture2.xml')));
  assert(isXML('<?xml-stylesheet type="text/xsl" href="transform.xsl"?>'));
  assert(isXML('<message><warning>I am XML</warning></message>'));
});

it('Should detect XML multiline', function() {
  assert(isXML(
    '<?xml version="1.0" encoding="ISO-8859-1"?>' +
    '  <bookstore>' +
    '    <book>' +
    '      <title lang="eng">Harry Potter</title>' +
    '      <price>29.99</price>' +
    '    </book>' +
    '    <book>' +
    '      <title lang="eng">Learning XML</title>' +
    '      <price>39.95</price>' +
    '    </book>' +
    '  </bookstore>'
  ));
});

it('Should detect Chinese XML', function() {
  assert(isXML('<收件人>一丝·思密达</收件人>'));
  assert(isXML(
    '<标题>一丝是谁？</标题>' +
    '<简介>当你们每天喊我「丝姐」的时候' +
    '我深深的沉浸在其中不能自拔</简介>'
  ));
});

it('Should detect HTML', function() {
  assert(isXML('<!doctype html>'));
  assert(isXML('\n\n<!doctype html><html>'));
  assert(isXML('\n\n\t  <!doctype html><html>'));
  assert(isXML('<html>'));
  assert(isXML('<html></html>'));
  assert(isXML('<html lang="en"></html>'));
  assert(isXML('<html><body></html>'));
  assert(isXML('<html><body class="no-js"></html>'));
  assert(isXML('<p>foo</p>'));
  assert(isXML('<a href="#">foo</a>'));
  assert(isXML('<x-foo>'));
});

it('Should detect XHTML', function() {
  assert(isXML('<html xmlns="http://www.w3.org/1999/xhtml">'));
  assert(isXML('<div lang="no" xml:lang="no">Heia Norge!</div>'));
  assert(isXML('<input type="text" />'));
  assert(isXML('<img src="#" alt="img"/>'));
});

it('Should detect HTML multiline', function() {
  assert(isXML(
    '<!DOCTYPE html>' +
    '<html lang="zh-cn">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<title>Document</title>' +
    '</head>' +
    '<body>' +
    '</body>' +
    '</html>'
  ));
  assert(isXML(
    '<style>' +
    '  .foo {' +
    '    position: absolute;' +
    '    content: "<h3>heading</h3>";' +
    '  }'
  ));
});

it('Should detect SVG', function() {
  assert(isXML(fs.readFileSync('test/fixture.svg')));
  assert(isXML(fs.readFileSync('test/g.svg')));
  assert(isXML('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
  assert(isXML('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>'));
  assert(isXML('<svg></svg>    '));
  assert(isXML('\n\t<svg>\n  </svg>'));
});

it('Should detect Emjio', function() {
  assert(isXML('<p class="foo_bar-🙈🔞🙈" id="👻">'));
  assert(isXML('<p 😂👻😂="foo_bar">'));
  assert(isXML('<foo😂😂>'));
  assert(isXML('<bar-x></bar-x😂😂>'));
  assert(isXML('<p>😂</p>'));
  assert(isXML('<foo😘( ●─● )💓></foo😘( ●─● )💓>'));
  assert(isXML('<p class="(ོ•̀⌄•́)ོ"></p>'));
});

it('Should detect MathML', function() {
  assert(isXML(fs.readFileSync('test/fixture.math')));
});

it('Should not match string', function() {
  assert(!isXML('This is not html, but it mentions <html></html> tags'));
  assert(!isXML('This is not svg, but it mentions <svg></svg> tags'));
});

it('Should not match CSS', function() {
  assert(!isXML(
    '  .foo {' +
    '    position: absolute;' +
    '    content: "<h3>heading</h3>";' +
    '  }'
  ));
});

it('Should not match Jade', function() {
  assert(!isXML(
    'doctype html' +
    'html(lang="zh-cn")' +
    'head' +
    '  meta(charset="UTF-8")' +
    '  title Document' +
    'body'
  ));
});

it('Should not match YAML', function() {
  assert(!isXML(
    'men: [John Smith, Bill Jones]' +
    'women:' +
    '  - Mary Smith' +
    '  - Susan Williams'
  ));
});
