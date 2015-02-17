/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var group = require('..');

var simpleSubForm = function(content) {
  return {form: {content: [content]}};
};

var A = simpleSubForm('A');
var B = simpleSubForm('B');
var C = simpleSubForm('C');
var D = simpleSubForm('D');

var X = {use: 'X'};
var Y = {definition: 'Y'};

describe('group series', function() {
  it('is a function', function() {
    expect(group)
      .to.be.a('function');
  });

  it('works on Immutables', function() {
    expect(group(Immutable.fromJS({
      content: [A, B, X, 'text', Y, C, D]})
    ).toJS())
      .to.eql([
        {type: 'series', content: [A, B]},
        {type: 'paragraph', content: [X, 'text', Y]},
        {type: 'series', content: [C, D]}
      ]);
  });
});
