
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'mount-default' do

    layers = (1..3).map do |i|
      create(:base_layer, url: "url#{i}")
    end

    wms_layers = (1..3).map do |i|
      create(:wms_layer, layer: "layer#{i}", address: "address#{i}")
    end

    n = create(:narrative, base_layer: layers.last, choropleth: 'choropleth',
               wms_layers: wms_layers, year_start: 2000, year_end: 2015)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'mount-default', page)

  end

  it 'list-layers' do

    layers = (1..3).map do |i|

      create(:base_layer,
        name: "Layer #{i}",
        url: "url#{i}",
      )

    end

    n = create(:narrative, base_layer: layers.last)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'list-layers', page)

  end

  it 'change-layer' do

    (1..3).each do |i|

      create(:base_layer,
        name: "Layer #{i}",
        url: "url#{i}",
      )

    end

    n = create(:narrative)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'change-layer', page)

  end

end
