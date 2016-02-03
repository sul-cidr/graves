
require 'rails_helper'

describe 'graves/read', type: :view do

  let!(:narrative) {
    create(:narrative)
  }

  it 'displays the narrative' do

    assign(:narrative, narrative)

    render

    expect(rendered).to have_tag('h1.title', narrative.title)
    expect(rendered).to have_tag('h3.author', narrative.author.full_name)
    expect(rendered).to have_tag('h3.blurb', narrative.blurb)

    # Check for the raw narrative markup.
    markup = Nokogiri::HTML(rendered).css('#narrative')
    expect(markup.children.to_s).to eq(narrative.markup)

  end

end
