'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrStates = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    arrStates.push({ ...stateCopy });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
