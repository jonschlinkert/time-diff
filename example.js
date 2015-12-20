'use strict';

var glob = require('glob');
var Time = require('./');

var time = new Time();
time.start('foo');
console.log(time.end('foo', 's', 3));
console.log(time.end('foo'));

time = new Time('s', 6);
time.start('bar');
time.start('baz');
console.log(time.end('bar'));
console.log(time.end('baz'));



time = new Time('ms', 5);
time.start('glob');
glob.sync('node_modules/**/*');
console.log(time.end('glob'));


time = new Time();
time.start('glob');
glob.sync('node_modules/**/*');
glob.sync('node_modules/**/*');
glob.sync('node_modules/**/*');
console.log(time.end('glob'));


