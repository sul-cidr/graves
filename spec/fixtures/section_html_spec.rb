
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


end
