import ReactDOM from "react-dom";

import init from "../../src";

import defaultHTML from "../fixtures/default/page/default.html";

import React from "react";
import { Provider } from "react-redux";

import App from "../../src/components/app";
import createStore from "../../src/store";
import reducers from "../../src/reducers";

import { CLOSE_TUTORIAL_MODAL } from "../../src/constants";

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

export function startWithoutModal(fixture) {
  jasmine.getFixtures().set(fixture || defaultHTML);
  jasmine.Ajax.install();

  const store = createStore(reducers);

  store.dispatch({
    type: CLOSE_TUTORIAL_MODAL
  });

  window.READ = ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("read")
  );
}

/**
 * Stop the app.
 */
export function stop() {
  if (window.READ) {
    // Unmount the application.
    let read = document.getElementById("read");
    ReactDOM.unmountComponentAtNode(read);
  }

  jasmine.Ajax.uninstall();

  delete window.READ;
}
