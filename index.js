/*!
 * log-time <https://github.com/jonschlinkert/log-time>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var red = require('ansi-red');
var pretty = require('pretty-time');
var isNumber = require('is-number');

/**
 * Create an instance of `Time`, optionally specifying the
 * time-scale to use and/or the number of decimal places to display.
 *
 * ```js
 * var time = new Time('s', 3);
 * ```
 * @param {String|Number} `smallest` The smallest time scale to show, or the number of decimal places to display
 * @param {Number} `digits` The number of decimal places to display
 */

function Time(smallest, digits) {
  if (!(this instanceof Time)) {
    return new Time(smallest, digits);
  }
  if (isNumber(smallest)) {
    digits = smallest;
    smallest = null;
  }
  this.smallest = smallest;
  this.digits = digits;
  this.times = {};
}

Time.prototype.start = function(name) {
  return (this.times[name] = process.hrtime());
};

Time.prototype.end = function(name, smallest, digits) {
  var start = this.times[name];
  if (typeof start === 'undefined') {
    throw new Error(red('start time not defined for "' + name + '"'));
  }

  if (isNumber(smallest)) {
    digits = smallest;
    smallest = null;
  }

  if (!smallest && this.smallest) smallest = this.smallest;
  if (!digits && this.digits) digits = this.digits;
  return pretty(process.hrtime(start), smallest, digits);
};

/**
 * Expose `time`
 */

module.exports = Time;
