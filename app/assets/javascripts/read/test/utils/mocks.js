

import sinon from 'sinon';
import createMockRaf from 'mock-raf';


/**
 * Mock `window.requestAnimationFrame`.
 */
export function mockRaf() {
  let mock = createMockRaf();
  sinon.stub(window, 'requestAnimationFrame', mock.raf);
  return mock;
}


/**
 * Unock `window.requestAnimationFrame`.
 */
export function unmockRaf() {
  window.requestAnimationFrame.restore();
}
