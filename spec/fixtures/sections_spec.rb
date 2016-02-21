
require 'rails_helper'

describe 'Sections', type: :feature do

  it 'mount-sections' do

    markup = ''

    10.times do |i|

      markup += 'word '*1000

      tl = "0,#{100*(i+1)}"
      br = "100,#{100*i}"

      markup += <<-HTML
        <div
          class="section"
          data-label="Section #{i}"
          data-tl="#{tl}"
          data-br="#{br}">
      HTML

      markup += 'word '*1000
      markup += '</div>'

    end

    n = create(:narrative, markup: markup)

    visit("read/#{n.slug}")

    write_page_fixture('sections', 'mount-sections', page)

  end

end
