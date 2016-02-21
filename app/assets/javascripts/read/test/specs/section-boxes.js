

import _ from 'lodash';
import $ from 'jquery';

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


  it('mounts section boxes from the markup', function() {

    expect(sections.boxes.getLayers().length).toEqual(10);

    _.times(10, function(i) {

      let tl = [0, 100*(i+1)];
      let br = [100, 100*i];

      // Get the box layer.
      let s = $(`[data-tl="${tl.join()}"][data-br="${br.join()}"]`);
      let box = sections.idToBox[Number(s.attr('data-id'))];

      let nw = box.getBounds().getNorthWest();
      let se = box.getBounds().getSouthEast();

      expect(nw).toEqual({ lng: tl[0], lat: tl[1] });
      expect(se).toEqual({ lng: br[0], lat: br[1] });

    });

  });


});
