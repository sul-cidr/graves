
require 'fileutils'

module Helpers

  #
  # Write a JSON fixture.
  #
  # @param slug [String]
  # @param json [Hash]
  #
  def write_fixture(slug, json)

    # Ensure the directory exists.
    path = "#{Rails.root}/app/assets/javascripts/graves/test/fixtures/#{slug}.json"
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, json)

  end

end
