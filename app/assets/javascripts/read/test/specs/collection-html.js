

describe('Collection HTML', function() {


  describe('data-id', function() {

    describe('hover', function() {
      it('highlights the map marker');
      it('shows the highlight line');
    });

    describe('blur', function() {
      it('unhighlights the map marker');
      it('hides the highlight line');
    });

    describe('click', function() {
      it('focuses the map');
    });

  });


  describe('data-zoom', function() {
    it('zooms the map');
  });

  describe('data-base-layer', function() {
    it('sets the base layer');
  });

  describe('data-wms-layer', function() {
    it('sets the WMS layer');
  });

  describe('data-choropleth', function() {
    it('sets the choropleth variable');
  });


});
