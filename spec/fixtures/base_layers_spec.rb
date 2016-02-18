
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'mount-default' do

    layers = (1..3).map do |i|
      create(:base_layer, url: "url#{i}")
    end

    n = create(:narrative, base_layer: layers.last)

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
