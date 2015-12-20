'use strict';

require('mocha');
var assert = require('assert');
var Time = require('./');
var time;

describe('time', function() {
  beforeEach(function() {
    time = new Time();
  });

  it('should expose a "start" method', function() {
    assert.equal(typeof time.start, 'function');
  });
  it('should expose an "end" method', function() {
    assert.equal(typeof time.end, 'function');
  });
  it('should expose a "times" object', function() {
    assert.equal(typeof time.times, 'object');
  });

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
