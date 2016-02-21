

import SectionBoxes from '../../src/components/section-boxes';

import * as utils from '../utils';


import mountSectionsHTML from
'../fixtures/section-boxes/page/mount-sections.html';


describe('Section Boxes', function() {


  let sections;


  beforeEach(function() {
    utils.start(mountSectionsHTML);
    sections = utils.getComponent(SectionBoxes);
  });


  it('mounts sections from the markup', function() {

    expect(sections.boxes.getLayers().length).toEqual(10);

  });


});
