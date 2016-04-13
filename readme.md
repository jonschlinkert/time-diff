# time-diff [![NPM version](https://img.shields.io/npm/v/time-diff.svg?style=flat)](https://www.npmjs.com/package/time-diff) [![NPM downloads](https://img.shields.io/npm/dm/time-diff.svg?style=flat)](https://npmjs.org/package/time-diff) [![Build Status](https://img.shields.io/travis/jonschlinkert/time-diff.svg?style=flat)](https://travis-ci.org/jonschlinkert/time-diff)

> Returns the formatted, high-resolution time difference between `start` and `end` times.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install time-diff --save
```

## Usage

Uses [pretty-time](https://github.com/jonschlinkert/pretty-time) to format time diffs.

```js
var Time = require('time-diff');
var time = new Time();

// create a start time for `foo`
time.start('foo');

// call `end` wherever the `foo` process ends
console.log(time.end('foo'));
//=> 12ms
```

## API

### [.start](index.js#L57)

Start a timer for the given `name`.

**Params**

* `name` **{String}**: Name to use for the starting time.
* `returns` **{Array}**: Returns the array from `process.hrtime()`

**Example**

```js
var time = new Time();
time.start('foo');
```

### [.end](index.js#L86)

Returns the cumulative elapsed time since the **first time** `time.start(name)` was called.

**Params**

* `name` **{String}**: The name of the cached starting time to create the diff
* `returns` **{Array}**: Returns the array from `process.hrtime()`

**Example**

```js
var time = new Time();
time.start('foo');

// do stuff
time.end('foo');
//=> 104μs

// do more stuff
time.end('foo');
//=> 1ms

// do more stuff
time.end('foo');
//=> 2ms
```

### [.diff](index.js#L134)

Returns a function for logging out out both the cumulative elapsed time since the first time `.diff(name)` was called, as well as the incremental elapsed time since the last `.diff(name)` was called. Unlike `.end()`, this method logs to `stderr` instead of returning a string. We could probably change this to return an object, feedback welcome.

Results in something like:
<br>
<img width="509" alt="screen shot 2016-04-13 at 7 45 12 pm" src="https://cloud.githubusercontent.com/assets/383994/14512800/478e1256-01b0-11e6-9e97-c6b625f097f7.png">

**Params**

* `name` **{String}**: The name of the starting time to store.
* `options` **{String}**

**Example**

```js
var time = new Time();
var diff = time.diff('my-app-name');

// do stuff
diff('after init');
//=> [19:44:05] my-app-name: after init 108μs

// do more stuff
diff('before options');
//=> [19:44:05] my-app-name: before options 2ms (+2ms)

// do more stuff
diff('after options');
//=> [19:44:05] my-app-name: after options 2ms (+152μs)
```

## Examples

Create an instance of `Time`, optionally specifying the time scale to use and the number of decimal places to display.

**Options**

* `options.smallest`: the smallest time scale to show
* `options.digits`: the number of decimal places to display (`digits`)

**Examples**

_(See [pretty-time](https://github.com/jonschlinkert/pretty-time) for all available formats)_

Given the following:

```js
var time = new Time(options);
time.start('foo');
```

Returns milliseconds by default

```js
console.log(time.end('foo'));
//=> 13ms
```

Milliseconds to 3 decimal places

```js
console.log(time.end('foo', 'ms', 3));
// or
console.log(time.end('foo', 3));
//=> 12.743ms
```

Seconds to 3 decimal places

```js
console.log(time.end('foo', 's', 3));
//=> 0.013s
```

Seconds

```js
console.log(time.end('foo', 's'));
//=> 0s
```

Microseconds

```js
console.log(time.end('foo', 'μs'));
//=> 12ms 934μs
```

Microseconds to 2 decimal places

```js
console.log(time.end('foo', 'μs', 2));
//=> 14ms 435.78μs
```

nano-seconds

```js
console.log(time.end('foo', 'n', 3));
//=> 13ms 796μs 677ns
```

nano-seconds to 3 decimal places

```js
console.log(time.end('foo', 'n', 3));
//=> 13ms 427μs 633.000ns
```

## Related projects

You might also be interested in these projects:

* [ansi-colors](https://www.npmjs.com/package/ansi-colors): Collection of ansi colors and styles. | [homepage](https://github.com/doowb/ansi-colors)
* [log-utils](https://www.npmjs.com/package/log-utils): Basic utils for command line applications. | [homepage](https://github.com/jonschlinkert/log-utils)
* [pretty-time](https://www.npmjs.com/package/pretty-time): Easily format the time from node.js `process.hrtime`. Works with timescales ranging from weeks to nanoseconds. | [homepage](https://github.com/jonschlinkert/pretty-time)
* [time-diff](https://www.npmjs.com/package/time-diff): Returns the formatted, high-resolution time difference between `start` and `end` times. | [homepage](https://github.com/jonschlinkert/time-diff)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/time-diff/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/time-diff/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 13, 2016._