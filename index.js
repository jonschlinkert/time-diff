/*!
 * log-time <https://github.com/jonschlinkert/log-time>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var isNumber = require('is-number');
var pretty = require('pretty-time');
var log = require('log-utils');

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

function Time(options) {
  if (!(this instanceof Time)) {
    return new Time(options);
  }

  this.options = options || {};
  var smallest = this.options.smallest;
  var digits = this.options.digits;

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

Time.prototype.diff = function(name, options) {
  var magenta = log.colors.magenta;
  var gray = log.colors.gray;

  var opts = {};
  extend(opts, this.options, options);

  this.start(name);
  var time = this;
  var prev;

  if (typeof options.times === 'undefined') {
    return function() {};
  }

  return function(msg) {
    var key = name + ':' + msg;
    var diff;

    if (typeof prev !== 'undefined') {
      diff = time.end(prev);
    }

    if (typeof opts.diffColor === 'function') {
      gray = opts.diffColor;
    }

    if (opts.color === false) {
      magenta = identity;
      gray = identity;
    }

    if (opts.times === true || opts.times === name) {
      var timeDiff = magenta(time.end(name));

      if (typeof diff === 'string') {
        timeDiff += gray(' (+' + diff + ')');
      }

      // create the arguments to log out
      var args = [name, msg, timeDiff];

      // support custom `.format` function
      if (typeof opts.format === 'function') {
        opts.format.apply(null, args);
      } else {
        format.apply(null, args);
      }
    }

    time.start(key);
    prev = key;
  };
};

Time.prototype.end = function(name, smallest, digits) {
  var start = this.times[name];
  if (typeof start === 'undefined') {
    throw new Error(log.colors.red('start time not defined for "' + name + '"'));
  }

  if (isNumber(smallest)) {
    digits = smallest;
    smallest = null;
  }

  if (!smallest && this.smallest) smallest = this.smallest;
  if (!digits && this.digits) digits = this.digits;
  return pretty(process.hrtime(start), smallest, digits);
};

function identity(val) {
  return val;
}

function format(name, msg, timeDiff) {
  var args = [log.timestamp, name + ':', msg];
  if (arguments.length === 3) {
    args.push(timeDiff);
  }
  console.error.apply(console, args);
}

/**
 * Expose `time`
 */

module.exports = Time;

module.exports.format = format;

