

import start from '../src';


describe('test', function() {

  beforeEach(function() {
    start();
  });

  it('test1', function() {
    expect(true).toBe(true);
  });

  it('test2', function() {
    expect(true).toBe(true);
  });

});
