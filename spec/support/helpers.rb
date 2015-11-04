
require 'fileutils'

module Helpers

  #
  # Write a JSON fixture.
  #
  # @param suite [String]
  # @param test [String]
  # @param data [Hash]
  #
  def write_fixture(suite, test, data)

    # Form the fixture path.
    base = "#{Rails.root}/app/assets/javascripts/graves/test/fixtures/"
    path = "#{base}/#{suite}/#{test}.json"

    # Ensure the directory exists.
    FileUtils.mkdir_p(File.dirname(path))

    # Write the fixture.
    File.write(path, data.to_json)

  end

end
