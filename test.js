'use strict';

require('mocha');
var assert = require('assert');
var strip = require('strip-color');
var Time = require('./');
var time;

describe('time', function() {
  beforeEach(function() {
    time = new Time();
  });

  describe('API', function() {
    it('should expose a "start" method', function() {
      assert.equal(typeof time.start, 'function');
    });
    it('should expose an "end" method', function() {
      assert.equal(typeof time.end, 'function');
    });
    it('should expose a "times" object', function() {
      assert.equal(typeof time.times, 'object');
    });
  });

  describe('.start', function() {
    it('should cache process.hrtime() start times', function() {
      time.start('a');
      time.start('b');
      time.start('c');
      assert(Array.isArray(time.times.a));
      assert(Array.isArray(time.times.b));
      assert(Array.isArray(time.times.c));
    });

    it('should return calculated time as a string', function() {
      time.start('a');
      assert.equal(typeof time.end('a'), 'string');
    });

    it('should throw an error when start time is not defined', function(cb) {
      try {
        time.end('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert(/start time/.test(err.message));
        cb();
      }
    });
  });

  describe('.diff', function() {
    it('should expose a .diff method', function() {
      assert.equal(typeof time.diff, 'function');
    });

    it('should NOT log times when `options.logDiff` is false', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        count++;
      };

      var diff = time.diff('generator', {logDiff: false});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 0);
    });

    it('should log times when `options.logTimes` IS true', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        count++;
      };

      var diff = time.diff('generator', {logTimes: true});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });

    it('should only log times that match the value passed on `options.times`', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        count++;
      };

      var name = 'one';

      var one = time.diff('one', {logDiff: name});
      var two = time.diff('two', {logDiff: name});

      one('foo');
      one('bar');
      one('baz');

      two('foo');
      two('bar');
      two('baz');

      assert.equal(count, 3);
    });

    it('should log colors when `options.nocolor` is NOT true', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        assert.notEqual(elapsed, strip(elapsed));
        count++;
      };

      var diff = time.diff('generator', {times: true});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });

    it('should NOT log colors when `options.nocolor` is true', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        assert.equal(elapsed, strip(elapsed));
        count++;
      };

      var diff = time.diff('generator', {nocolor: true});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });

    it('should support a custom `formatArgs` function', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, elapsed) {
        if (count === 0) assert.equal(timestamp, 'one');
        if (count === 1) assert.equal(timestamp, 'two');
        if (count === 2) assert.equal(timestamp, 'three');
        count++;
      };

      var diff = time.diff('generator', {
        formatArgs: function(timestamp, name, msg) {
          return msg;
        }
      });

      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });
  });
});


