
require 'rails_helper'

describe '/', type: :feature do

  it 'links to the narratives' do

    n1 = create(:narrative)
    n2 = create(:narrative)
    n3 = create(:narrative)

    visit('/')

    expect(page).to have_link(n1.title, href: "/read/#{n1.slug}")
    expect(page).to have_link(n2.title, href: "/read/#{n2.slug}")
    expect(page).to have_link(n3.title, href: "/read/#{n3.slug}")

  end

end
