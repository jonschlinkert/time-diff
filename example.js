'use strict';

var Time = require('./');

var time = new Time();
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


