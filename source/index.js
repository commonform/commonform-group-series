var clone = require('clone');
var predicate = require('commonform-predicate');

var isChild = predicate.child.bind(predicate);

var group = function(form) {
  return form.content
    .reduce(function(groups, element, index, content) {
      if (isChild(element)) {
        // `element` is part of the previous series.
        if (index > 0 && isChild(content[index - 1])) {
          groups[groups.length - 1].content.push(element);
        // `element` starts a new series.
        } else {
          groups.push({
            type: 'series',
            content: [element]
          });
        }
      } else {
        // `element` is part of the previous paragraph.
        if (index > 0 && !isChild(content[index - 1])) {
          groups[groups.length - 1].content.push(element);
        // `element` starts a new paragraph.
        } else {
          groups.push({
            type: 'paragraph',
            content: [element]
          });
        }
      }
      return groups;
    }, []);
};

module.exports = function(form) {
  return group(clone(form));
};

module.exports.version = '0.4.0';