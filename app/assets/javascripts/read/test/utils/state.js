

import init from '../../src';


import defaultHTML from
'../fixtures/default/page/default.html';


/**
 * Mount the app.
 *
 * @param {String} fixture
 */
export function start(fixture) {

  stop();

  // Set the page fixture.
  jasmine.getFixtures().set(fixture || defaultHTML);
  jasmine.Ajax.install();

  window.ROOT = init();

}


/**
 * Stop the app.
 */
export function stop() {

  try {
    let read = document.getElementById('read');
    ReactDOM.unmountComponentAtNode(read);
  }

  catch (e) {}

  jasmine.Ajax.uninstall();

}
