class AddSlugToLayers < ActiveRecord::Migration
  def change

    add_column :base_layers, :slug, :string, null: false
    add_index :base_layers, :slug, unique: true

    add_column :wms_layers, :slug, :string, null: false
    add_index :wms_layers, :slug, unique: true

  end
end
