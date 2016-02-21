

import SectionBoxes from './section-boxes';

import * as utils from '../utils';


describe('Section Boxes', function() {


  let sections;


  beforeEach(function() {
    utils.start();
    sections = utils.getComponent(SectionBoxes);
  });


  it('mounts sections from the markup', function() {

    expect(sections.boxes.getLayers().length).toEqual(10);

  });


});
