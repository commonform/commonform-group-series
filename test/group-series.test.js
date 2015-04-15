/* jshint mocha: true */
var expect = require('chai').expect;
var validate = require('commonform-validate');
var group = require('..');

var A = {form: {content: ['A']}};
var B = {form: {content: ['B']}};
var C = {form: {content: ['C']}};
var D = {form: {content: ['D']}};

var X = {use: 'X'};
var Y = {definition: 'Y'};

var form = {content: [A, B, X, 'text', Y, C, D]};

describe('group series', function() {
  it('is a function', function() {
    expect(group).to.be.a('function');
  });

  it('handles valid objects', function() {
    expect(validate.form(form)).to.equal(true);
  });

  it('handles nested objects', function() {
    expect(
      group(form)
    ).to.eql([
      {
        type: 'series',
        content: [A, B]
      },
      {
        type: 'paragraph',
        content: [X, 'text', Y]
      },
      {
        type: 'series',
        content: [C, D]
      }
    ]);
  });
});
