
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'mount-default' do

    create(:base_layer, url: 'url1')
    create(:base_layer, url: 'url2')
    default = create(:base_layer, url: 'url3')

    n = create(:narrative, base_layer: default)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'mount-default', page)

  end

end
