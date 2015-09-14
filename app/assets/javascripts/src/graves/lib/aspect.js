

export default class {


  /**
   * Listen for store changes.
   *
   * @param {Object} store - The state atom.
   */
  constructor(store) {
    store.subscribe(() => {
      console.log(store.getState());
    });
  }


  /**
   * Filter the state tree.
   *
   * @param {Object} state - The new state.
   */
  mapState(state) {
    return state;
  }


}
