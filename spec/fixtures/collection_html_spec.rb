
require 'rails_helper'

describe 'Collection HTML', type: :feature do


  describe 'data-id' do

    it 'collection' do

      create(
        :collection,
        id: 1,
        geometry: Helpers::Geo.point(1, 2),
        province_p: 'data-id',
      )

      visit('api/collections.json')

      write_collection_fixture('collection-html', 'data-id', page)

    end

    it 'narrative' do

      markup = <<-HTML
        <span class="collection" data-id="1">collection</span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-id', page)

    end

  end


  describe 'data-zoom' do

    it 'collection' do

      create(
        :collection,
        id: 1,
        geometry: Helpers::Geo.point(1, 2),
        province_p: 'data-zoom',
      )

      visit('api/collections.json')

      write_collection_fixture('collection-html', 'data-zoom', page)

    end

    it 'narrative' do

      markup = <<-HTML
        <span class="collection" data-id="1" data-zoom="1">collection</span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-zoom', page)

    end

  end


end
