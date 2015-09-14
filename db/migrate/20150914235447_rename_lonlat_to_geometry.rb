class RenameLonlatToGeometry < ActiveRecord::Migration
  def change
    rename_column :collections, :lonlat, :geometry
  end
end
