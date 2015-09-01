
module Helpers::Import

  #
  # Convert GB18030 -> UTF8.
  #
  # @param value [String]
  # @return [String]
  #
  def self.gb18030_to_utf8(value)
    value.force_encoding('GB18030').encode('utf-8')
  end

end
