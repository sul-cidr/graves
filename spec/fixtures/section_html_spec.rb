
require 'rails_helper'

describe 'Section HTML', type: :feature do


  describe 'data-tl + data-br + data-label' do

    it 'page' do

      markup = <<-HTML
        <div
          class="section"
          data-label="Section"
          data-tl="-50,50"
          data-br="50,-50"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-tl-br-label', page)

    end

  end


  describe 'data-zoom' do

    it 'page' do

      markup = <<-HTML
        <div
          class="section"
          data-label="Section"
          data-tl="-50,50"
          data-br="50,-50"
          data-zoom="1"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-zoom', page)

    end

  end


  describe 'data-base-layer' do

    it 'page' do

      layers = (1..2).map do |i|
        create(:base_layer, id: i, url: "url#{i}")
      end

      markup = <<-HTML
        <div
          class="section"
          data-base-layer="2"
        ></div>
      HTML

      n = create(
        :narrative,
        base_layer: layers.first,
        markup: markup,
      )

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-base-layer', page)

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
        <div
          class="section"
          data-wms-layer="1"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-wms-layer', page)

    end

  end


  describe 'data-choropleth' do

    it 'page' do

      markup = <<-HTML
        <div
          class="section"
          data-choropleth="a100002_10"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-choropleth', page)

    end

  end


  describe 'data-start + data-end' do

    it 'collections' do

      n1 = create(:notice, deadline: '2009-01-01') # in range
      n2 = create(:notice, deadline: '2011-01-01') # not in range

      create(:collection, id: 1, notice: n1)
      create(:collection, id: 2, notice: n2)

      visit('api/collections.json')

      write_collection_fixture('section-html', 'data-start-end', page)

    end

    it 'page' do

      markup = <<-HTML
        <div
          class="section"
          data-start="2008-01-01"
          data-end="2010-01-01"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-start-end', page)

    end

  end


  describe 'data-tags' do

    it 'collections' do

      t1 = create(:tag, tag: 'tag1')
      t2 = create(:tag, tag: 'tag2')

      c1 = create(:collection, id: 1)
      c2 = create(:collection, id: 2)
      create(:collection, id: 3)

      create(:collection_tag_rel, collection: c1, tag: t1)
      create(:collection_tag_rel, collection: c2, tag: t2)

      visit('api/collections.json')

      write_collection_fixture('section-html', 'data-tags', page)

    end

    it 'page' do

      markup = <<-HTML
        <div
          class="section"
          data-tags="tag1,tag2"
        ></div>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-tags', page)

    end

  end


end
