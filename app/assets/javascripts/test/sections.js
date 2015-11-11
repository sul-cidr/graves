

import * as utils from './utils';
import SectionGroup from '../src/components/section-group';

import validSectionsJSON from
'./fixtures/sections/valid.narrative.json';


describe('Sections', function() {

  let group;

  beforeEach(function() {
    group = utils.unwrap(GRAVES, SectionGroup);
  });

  it('adds map layers when a narrative loads', function() {

    expect(group.labels.getLayers().length).toEqual(0);
    expect(group.boxes.getLayers().length).toEqual(0);

    utils.navigate('/read/narrative');
    utils.respondNarrative(validSectionsJSON);

    expect(group.labels.getLayers().length).toEqual(10);
    expect(group.boxes.getLayers().length).toEqual(10);

    // test labels, coords

  });

  it('removes map layers when a narrative closes');
  it('highlights the label of the visible section');
  it('shows a zoom tip for unfocused section');
  it('does not show a zoom tip for a focused section');
  it('zooms to the section on click');

});
