class AddBaseLayerToNarratives < ActiveRecord::Migration
  def change
    add_reference(
      :narratives,
      :base_layer,
      index: true,
      foreign_key: true,
      null: false,
    )
  end
end
