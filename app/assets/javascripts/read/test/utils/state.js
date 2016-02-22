

import ReactDOM from 'react-dom';

import init from '../../src';


import defaultHTML from
'../fixtures/default/page/default.html';


/**
 * Mount the app.
 *
 * @param {String} fixture
 */
export function start(fixture) {

  // Set the page fixture.
  jasmine.getFixtures().set(fixture || defaultHTML);
  jasmine.Ajax.install();

  window.READ = init();

}


/**
 * Stop the app.
 */
export function stop() {

  if (window.READ) {

    // Unmount the application.
    let read = document.getElementById('read');
    ReactDOM.unmountComponentAtNode(read);

  }

  jasmine.Ajax.uninstall();

  delete window.READ;

}
