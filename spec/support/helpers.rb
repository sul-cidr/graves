
require 'fileutils'

module Helpers

  #
  # Write a #page fixture.
  #
  def write_page_fixture(suite, test, page)

    # Parse the HTML.
    html = Nokogiri::HTML(page.body)

    # Form the fixture path.
    path = Rails.root.join(".fixtures/#{suite}/#{test}.html")

    # Ensure the directory exists.
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, html.css('#page'))

  end

end
