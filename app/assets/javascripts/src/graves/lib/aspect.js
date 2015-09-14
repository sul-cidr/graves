

export default class {


  /**
   * Listen for store changes.
   *
   * @param {Object} store - The state atom.
   */
  constructor(store) {
    store.subscribe(() => {
      this.render(this.mapState(store.getState()));
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


  /**
   * Manifest a new state.
   *
   * @param {Object} state - The mapped state.
   */
  render(state) {
    // no-op
  }


}
