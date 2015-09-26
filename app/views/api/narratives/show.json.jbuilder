
json.extract!(
  @narrative,
  :id,
  :title,
  :markup,
  :slug,
)

json.author = @narrative.author.full_name
