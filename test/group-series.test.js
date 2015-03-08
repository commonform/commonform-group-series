/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var validate = require('commonform-validate');
var group = require('..');

var simpleInclusion = function(content) {
  return {inclusion: {content: [content]}};
};

var A = simpleInclusion('A');
var B = simpleInclusion('B');
var C = simpleInclusion('C');
var D = simpleInclusion('D');

var X = {use: 'X'};
var Y = {definition: 'Y'};

var form = Immutable.fromJS({
  content: [A, B, X, 'text', Y, C, D]
});

describe('group series', function() {
  it('is a function', function() {
    expect(group)
      .to.be.a('function');
  });

  it('handles valid objects', function() {
    expect(validate.nestedForm(form)).to.equal(true);
  });

  it('works on Immutables', function() {
    expect(group(form).toJS())
      .to.eql([
        {type: 'series', content: [A, B]},
        {type: 'paragraph', content: [X, 'text', Y]},
        {type: 'series', content: [C, D]}
      ]);
  });
});
