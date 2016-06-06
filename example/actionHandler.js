/**
 * Store action handler
 * @param  {Object} action Object
 * @param  {Object} state  Object
 * @return {Object} new State
 */
export default function onaction (action, state) {
  switch (action.type) {
    case 'updateUser':
      const { user } = action.payload
      return {
        ...state,
        user
      }
  }
}
