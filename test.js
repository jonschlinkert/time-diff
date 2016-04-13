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

    it('should NOT log times when `options.times` is NOT true', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, timeDiff) {
        count++;
      };

      var diff = time.diff('generator', {times: undefined});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 0);
    });

    it('should log times when `options.times` IS true', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, timeDiff) {
        count++;
      };

      var diff = time.diff('generator', {times: true});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });

    it('should only log times that match the value passed on `options.times`', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, timeDiff) {
        count++;
      };

      var times = 'one';

      var one = time.diff('one', {times: times});
      var two = time.diff('two', {times: times});

      one('foo');
      one('bar');
      one('baz');

      two('foo');
      two('bar');
      two('baz');

      assert.equal(count, 3);
    });

    it('should log colors when `options.color` is NOT false', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, timeDiff) {
        assert.notEqual(timeDiff, strip(timeDiff));
        count++;
      };

      var diff = time.diff('generator', {times: true});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });

    it('should NOT log colors when `options.color` is false', function() {
      var time = new Time();
      var error = console.error;
      var count = 0;

      console.error = function(timestamp, name, msg, timeDiff) {
        assert.equal(timeDiff, strip(timeDiff));
        count++;
      };

      var diff = time.diff('generator', {times: true, color: false});
      diff('one');
      diff('two');
      diff('three');
      assert.equal(count, 3);
    });
  });
});


