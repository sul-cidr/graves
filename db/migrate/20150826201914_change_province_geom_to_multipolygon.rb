class ChangeProvinceGeomToMultipolygon < ActiveRecord::Migration
  def change
    remove_column :provinces, :geometry
    add_column :provinces, :geometry, :multi_polygon
    add_index :provinces, :geometry, using: :gist
  end
end
