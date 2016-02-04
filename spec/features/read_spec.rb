
require 'rails_helper'

describe '/read/:slug', type: :feature do

  it 'links to the narratives' do

    n = create(:narrative)

    visit("read/#{n.slug}")

    expect(page).to have_css('h1.title', text: n.title)
    expect(page).to have_css('h3.author', text: n.author.full_name)
    expect(page).to have_css('h3.blurb', text: n.blurb)

    # Check for the raw narrative markup.
    markup = Nokogiri::HTML(page.body).css('#narrative')
    expect(markup.children.to_s).to eq(n.markup)


  end

end
