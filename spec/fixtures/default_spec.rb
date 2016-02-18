
require 'rails_helper'

describe 'Default', type: :feature do

  it 'html' do

    n = create(:narrative)

    visit("read/#{n.slug}")

    write_page_fixture('default', 'default', page)

  end

end
