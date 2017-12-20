"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createVuexReloadPlugin;
function createVuexReloadPlugin(_ref) {
  var actions = _ref.actions,
      condition = _ref.condition;

  return function (store) {
    // pass every mutation to the condition checker
    store.subscribe(function (mutation) {
      // if it passes, dispatch all the actions
      if (condition(mutation) === true) {
        actions.map(function (action) {
          return store.dispatch(action);
        });
      }
    });
  };
}
