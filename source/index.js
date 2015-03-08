var Immutable = require('immutable');
var predicate = require('commonform-predicate');

var pushToLastContent = function(list, element) {
  return list.update(list.count() - 1, function(lastGroup) {
    return lastGroup.update('content', function(content) {
      return content.push(element);
    });
  });
};

module.exports = function(form) {
  return form.get('content')
    .reduce(function(listOfGroups, element, index, content) {
      // `element` is an inclusion.
      if (predicate.inclusion(element)) {
        // `element` is part of the previous series.
        if (index > 0 && predicate.inclusion(content.get(index - 1))) {
          return pushToLastContent(listOfGroups, element);

        // `element` starts a new series.
        } else {
          return listOfGroups.push(Immutable.Map({
            type: 'series',
            content: Immutable.List([element])
          }));
        }

      // `element` is not an inclusion.
      } else {
        // `element` is part of the previous paragraph.
        if (index > 0 && !predicate.inclusion(content.get(index - 1))) {
          return pushToLastContent(listOfGroups, element);

        // `element` starts a new paragraph.
        } else {
          return listOfGroups.push(Immutable.Map({
            type: 'paragraph',
            content: Immutable.List([element])
          }));
        }
      }
    }, Immutable.List());
};

module.exports.version = '0.3.0';
