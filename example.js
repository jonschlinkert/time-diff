'use strict';

var argv = require('minimist')(process.argv.slice(2));
var Time = require('./');

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

var diff = time.diff('my-app-name', argv);

/**
 * Next,
 */

// do stuff
diff('after init');

// do more stuff...
diff('before options');

// then load some options
diff('after options');
