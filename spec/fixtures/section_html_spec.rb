
require 'rails_helper'

describe 'Section HTML', type: :feature do


  describe 'data-tl+data-br' do

    it 'narrative' do

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

      write_page_fixture('section-html', 'data-tl-br', page)

    end

  end


  describe 'data-zoom' do

    it 'narrative' do

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


end
