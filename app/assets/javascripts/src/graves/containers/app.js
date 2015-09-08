

import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';


class App extends Component {


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <h1>Chinese Graves</h1>
    );
  }


}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


/**
 * Map state into app props.
 *
 * @param {Object} state
 * @return {Object}
 */
function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(App);
