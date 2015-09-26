
module ApplicationHelper

  #
  # Load a TypeKit font set.
  #
  # @param key [String]
  #
  def typekit_include_tag(key)
    javascript_include_tag("//use.typekit.com/#{key}.js") +
    javascript_tag("try{Typekit.load()}catch(e){}")
  end

end
