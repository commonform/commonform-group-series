var validate = require('commonform-validate');

var PARAGRAPH = 'paragraph';
var SERIES = 'series';

var isAnySubForm = function(object) {
  return validate.nestedSubForm(object) || validate.subForm(object);
};

module.exports = function(form) {
  if (!validate.form(form) && !validate.nestedForm(form)) {
    throw new Error('Invalid form or nested form');
  }

  return form.content.reduce(function(result, element, index, content) {
    var lastGroup;

    // A sub-form
    if (validate.nestedSubForm(element)) {

      // Part of previous series
      if (index > 0 && isAnySubForm(content[index - 1])) {
        lastGroup = result[result.length - 1];
        lastGroup.content.push(element);
        return result;

      // New series
      } else {
        return result.concat({
          type: SERIES,
          content: [element]
        });
      }

    // Some other type of content
    } else {

      // Part of previous paragraph
      if (index > 0 && !isAnySubForm(content[index - 1])) {
        lastGroup = result[result.length - 1];
        lastGroup.content.push(element);
        return result;

      // New paragraph
      } else {
        return result.concat({
          type: PARAGRAPH,
          content: [element]
        });
      }
    }
  }, []);
};

module.exports.version = '0.1.0';
