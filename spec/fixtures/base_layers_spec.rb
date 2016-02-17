
require 'rails_helper'

describe 'Base Layers', type: :feature do

  it 'test' do

    n = create(:narrative)

    visit("read/#{n.slug}")

    html = Nokogiri::HTML(page.body)

    # TODO|dev

    path = Rails.root.join(
      'app/assets/javascripts/read/test/fixtures/base-layers/page.html'
    )

    FileUtils.mkdir_p(File.dirname(path))

    File.write(path, html.css('#page'))

  end

end
