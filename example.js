'use strict';

var opts = {alias: {logDiff: 'd', logTime: 't'}, boolean: ['logDiff']};
var argv = require('minimist')(process.argv.slice(2), opts);
var Time = require('./');
console.log(argv)

var time = new Time(argv);
time.start('foo');
console.log(time.end('foo', 's'));
console.log(time.end('foo', 's', 3));
console.log(time.end('foo', 'ms', 3));
console.log(time.end('foo', 'μs'));
console.log(time.end('foo', 'μs', 2));
console.log(time.end('foo', 'n', 3));
console.log(time.end('foo', 'n'));
console.log(time.end('foo', 3));
console.log(time.end('foo'));

// time = new Time('s', 6);
// time.start('bar');
// time.start('baz');
// console.log(time.end('bar'));
// console.log(time.end('baz'));

/**
 * Diffs
 *
 * Pass an instance of `time-diff` to `log-time-diff`,
 * along with a "namespace" to use for diffs
 */

time.options.formatArgs = function(timestamp, name, msg, elapsed) {
  return [timestamp, msg, elapsed];
};

var diffAbc = time.diff('abc', argv);
var diffXyz = time.diff('xyz', argv);

/**
 * Next,
 */

// do stuff
diffAbc('after init');

// do more stuff...
diffAbc('before options');

// then load some options
diffAbc('after options');


/**
 * Next,
 */

// do stuff
diffXyz('after init');

// do more stuff...
diffXyz('before options');

// then load some options
diffXyz('after options');
