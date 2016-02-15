

# Base layers

base_layers = YAML::load_file(
  Rails.root.join('db/seeds/base_layers.yml')
)

BaseLayer.create!(base_layers)
