
require 'fileutils'

module Helpers

  #
  # Write a fixture.
  #
  def write_fixture(suite, type, test, fixture)

    # Form the fixture path.
    path = Rails.root.join(
      'app/assets/javascripts/read/test/fixtures',
      suite, type, test
    )

    # Ensure the directory exists.
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, fixture)

  end

  #
  # Write a api/collections.json fixture.
  #
  def write_collection_fixture(suite, test, page)

    fixture = page.body

    write_fixture(
      suite,
      'collections',
      "#{test}.json",
      fixture,
    )

  end

  #
  # Write a #page fixture.
  #
  def write_page_fixture(suite, test, page)

    fixture = Nokogiri::HTML(page.body).css('#page')

    write_fixture(
      suite,
      'page',
      "#{test}.html",
      fixture,
    )

  end

end
