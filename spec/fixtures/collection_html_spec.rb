
require 'rails_helper'

describe 'Collection HTML', type: :feature do


  describe 'data-id' do

    it 'collections' do

      create(
        :collection,
        id: 1,
        geometry: Helpers::Geo.point(1, 2),
        province_p: 'data-id',
      )

      visit('api/collections.json')

      write_collection_fixture('collection-html', 'data-id', page)

    end

    it 'page' do

      markup = <<-HTML
        <span
          class="collection"
          data-id="1"
        ></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-id', page)

    end

  end


  describe 'data-zoom' do

    it 'collections' do

      create(
        :collection,
        id: 1,
        geometry: Helpers::Geo.point(1, 2),
        province_p: 'data-zoom',
      )

      visit('api/collections.json')

      write_collection_fixture('collection-html', 'data-zoom', page)

    end

    it 'page' do

      markup = <<-HTML
        <span
          class="collection"
          data-id="1"
          data-zoom="1"
        ></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-zoom', page)

    end

  end


  describe 'data-base-layer' do

    it 'page' do

      layers = (1..2).map do |i|
        create(:base_layer, id: i, url: "url#{i}")
      end

      markup = <<-HTML
        <span
          class="collection"
          data-base-layer="2"
        ></span>
      HTML

      n = create(
        :narrative,
        base_layer: layers.first,
        markup: markup,
      )

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-base-layer', page)

    end

  end


  describe 'data-wms-layer' do

    it 'page' do

      create(
        :wms_layer,
        id: 1,
        address: "address1",
        layer: "layer1",
      )

      markup = <<-HTML
        <span
          class="collection"
          data-wms-layer="1"
        ></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-wms-layer', page)

    end

  end


  describe 'data-choropleth' do

    it 'page' do

      markup = <<-HTML
        <span
          class="collection"
          data-choropleth="a100002_10"
        ></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-choropleth', page)

    end

  end


  describe 'data-start + data-end' do

    it 'collections' do

      n1 = create(:notice, deadline: '2004-06-01')
      n2 = create(:notice, deadline: '2005-06-01')

      create(:collection, id: 1, notice: n1)
      create(:collection, id: 2, notice: n2)

      visit('api/collections.json')

      write_collection_fixture('collection-html', 'data-start-end', page)

    end

    it 'page' do

      markup = <<-HTML
        <span
          class="collection"
          data-start="2005-01-01"
          data-end="2006-01-01"
        ></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('collection-html', 'data-start-end', page)

    end

  end


end
