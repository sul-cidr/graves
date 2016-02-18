
require 'fileutils'

module Helpers

  #
  # Write a #page fixture.
  #
  def write_page_fixture(suite, test, page)

    # Parse the HTML.
    html = Nokogiri::HTML(page.body)

    # Form the fixture path.
    path = Rails.root.join(
      'app/assets/javascripts/read/test/fixtures',
      suite, 'page', "#{test}.html"
    )

    # Ensure the directory exists.
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, html.css('#page'))

  end

  #
  # Write a api/collections.json fixture.
  #
  def write_collection_fixture(suite, test, page)

    # Form the fixture path.
    path = Rails.root.join(
      'app/assets/javascripts/read/test/fixtures',
      suite, 'collections', "#{test}.json"
    )

    # Ensure the directory exists.
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, page.body.to_json)

  end

end
