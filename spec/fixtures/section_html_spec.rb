
require 'rails_helper'

describe 'Section HTML', type: :feature do


  describe 'data-tl+data-br' do

    it 'narrative' do

      markup = <<-HTML
        <span class="section" data-tl="-50,50" data-br="50,-50"></span>
      HTML

      n = create(:narrative, markup: markup)

      visit("read/#{n.slug}")

      write_page_fixture('section-html', 'data-tl-br', page)

    end

  end


end
