
require 'rails_helper'

describe 'WMS Layers', type: :feature do

  it 'list-layers' do

    (1..3).each do |i|

      create(:wms_layer,
        name: "Layer #{i}",
        address: "address#{i}",
        layer: "layer#{i}",
      )

    end

    n = create(:narrative)

    visit("read/#{n.slug}")

    write_page_fixture('wms-layers', 'list-layers', page)

  end

end
