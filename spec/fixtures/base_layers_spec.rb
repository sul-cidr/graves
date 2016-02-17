
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'mounts the default base layer' do

    create(:base_layer, url: 'http://layer1.org')
    create(:base_layer, url: 'http://layer2.org')

    default = create(:base_layer, url: 'http://layer3.org')

    n = create(:narrative, base_layer: default)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'page', page)

  end

end
