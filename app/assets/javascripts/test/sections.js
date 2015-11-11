

import _ from 'lodash';
import $ from 'jquery';
import SectionGroup from '../src/components/section-group';
import * as utils from './utils';

import validSectionsJSON from
'./fixtures/sections/valid.narrative.json';


describe('Sections', function() {

  let group;

  beforeEach(function() {
    group = utils.unwrap(GRAVES, SectionGroup);
  });

  it('adds map boxes when a narrative loads', function() {

    expect(group.boxes.getLayers().length).toEqual(0);

    utils.navigate('/read/narrative');
    utils.respondNarrative(validSectionsJSON);

    expect(group.boxes.getLayers().length).toEqual(10);

    _.times(10, function(i) {

      let tl = [0, 100*(i+1)];
      let br = [100, 100*i];

      // Get the box layer.
      let s = $(`[data-tl="${tl.join()}"][data-br="${br.join()}"]`);
      let box = group.idToBox[Number(s.attr('data-id'))];

      let nw = box.getBounds().getNorthWest();
      let se = box.getBounds().getSouthEast();

      expect(nw).toEqual({ lng: tl[0], lat: tl[1] });
      expect(se).toEqual({ lng: br[0], lat: br[1] });

    });

  });

  it('adds map labels when a narrative loads');
  it('removes map layers when a narrative closes');
  it('highlights the label of the visible section');
  it('shows a zoom tip for unfocused section');
  it('does not show a zoom tip for a focused section');
  it('zooms to the section on click');

});
