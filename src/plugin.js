export default function createVuexReloadPlugin ({ actions, condition }) {
  return store => {
    // pass every mutation to the condition checker
    store.subscribe(mutation => {
      // if it passes, dispatch all the actions
      if (condition(mutation) === true) {
        actions.map(action => {
          store.dispatch(action)
        })
      }
    })
  }
}
