'use strict';
module.exports = function isXML(str) {
  return (/^\s*<[\s\S]*>/).test(str);
};
