
require 'rails_helper'

describe '/read/:slug', type: :feature do
  it 'links to the narratives' do
    n = create(:narrative)

    visit("read/#{n.slug}")

    expect(page).to have_css('h1.title', text: n.title)
    expect(page).to have_css('h2.subtitle', text: n.subtitle)
    expect(page).to have_css('h3.author', text: n.author.full_name)
    expect(page).to have_css('h3.affiliation', text: n.author.affiliation)
    expect(page).to have_css('p.blurb', text: n.blurb)

    # Check for the raw narrative markup.
    markup = Nokogiri::HTML(page.body).css('#narrative')
    expect(markup.children.to_s).to eq(n.markup)
  end

  it 'filters collections based on one tag' do
    tag1 = create(:tag, label: 'Tag 1', tag: 'tag1')
    tag2 = create(:tag, label: 'Tag 2', tag: 'tag2')
    create(:collection, tags: [tag1])
    visit("api/collections.json?tag=#{tag1.tag}")
    expect(page).to have_content(tag1.tag)
    expect(page).not_to have_content(tag2.tag)
  end

  it 'filters collections based on several tags' do
    tag1 = create(:tag, label: 'Tag 1', tag: 'tag1')
    tag2 = create(:tag, label: 'Tag 2', tag: 'tag2')
    create(:collection, tags: [tag1, tag2])
    visit("api/collections.json?tag=#{tag1.tag},#{tag2.tag}")
    expect(page).to have_content(tag1.tag)
    expect(page).to have_content(tag2.tag)
  end

  it 'returns all collections when tag is invalid' do
    tag1 = create(:tag, label: 'Tag 1', tag: 'tag1')
    tag2 = create(:tag, label: 'Tag 2', tag: 'tag2')
    create(:collection, tags: [tag1, tag2])
    visit('api/collections.json?tag=invalid')
    expect(page).to have_content(tag1.tag)
    expect(page).to have_content(tag2.tag)
  end
end
