
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'test' do

    n = create(:narrative)

    visit("read/#{n.slug}")

    write_page_fixture('base-layers', 'page', page)

  end

end
