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

/**
 * Start a timer for the given `name`.
 *
 * ```js
 * var time = new Time();
 * time.start('foo');
 * ```
 * @param {String} `name` Name to use for the starting time.
 * @return {Array} Returns the array from `process.hrtime()`
 * @api public
 */

Time.prototype.start = function(name) {
  return (this.times[name] = process.hrtime());
};

/**
 * Returns the cumulative elapsed time since the **first time** `time.start(name)`
 * was called.
 *
 * ```js
 * var time = new Time();
 * time.start('foo');
 *
 * // do stuff
 * time.end('foo');
 * //=> 104μs
 *
 * // do more stuff
 * time.end('foo');
 * //=> 1ms
 *
 * // do more stuff
 * time.end('foo');
 * //=> 2ms
 * ```
 * @param {String} `name` The name of the cached starting time to create the diff
 * @return {Array} Returns the array from `process.hrtime()`
 * @api public
 */

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

/**
 * Returns a function for logging out out both the cumulative elapsed time since
 * the first time `.diff(name)` was called, as well as the incremental elapsed
 * time since the last `.diff(name)` was called. Unlike `.end()`, this method logs
 * to `stderr` instead of returning a string. We could probably change this to
 * return an object, feedback welcome.
 *
 * ```js
 * var time = new Time();
 * var diff = time.diff('foo');
 *
 * // do stuff
 * diff('foo');
 * //=> 104μs
 *
 * // do more stuff
 * diff('bar');
 * //=> 1ms
 *
 * // do more stuff
 * diff('baz');
 * //=> 2ms
 * ```
 * Results in something like:
 * <br>
 * <img width="484" alt="screen shot 2016-04-13 at 7 12 37 pm" src="https://cloud.githubusercontent.com/assets/383994/14512287/b92ff5be-01ab-11e6-8989-0aaaca01d66f.png">
 *
 * @param {String} `name` The name of the starting time to store.
 * @param {String} `options`
 * @api public
 */

Time.prototype.diff = function(name, options) {
  var magenta = log.colors.magenta;
  var gray = log.colors.gray;

  var opts = {};
  extend(opts, this.options, options);

  if (typeof opts.times === 'undefined') {
    return function() {};
  }

  this.start(name);
  var time = this;
  var prev;

  function diff(msg) {
    var val;
    if (typeof prev !== 'undefined') {
      val = time.end(prev);
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

      if (typeof val === 'string') {
        timeDiff += gray(' (+' + val + ')');
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

    time.start(name);
    prev = name;
  };

  return diff;
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

