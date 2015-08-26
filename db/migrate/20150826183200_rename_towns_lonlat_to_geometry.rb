class RenameTownsLonlatToGeometry < ActiveRecord::Migration
  def change
    rename_column :towns, :lonlat, :geometry
  end
end
