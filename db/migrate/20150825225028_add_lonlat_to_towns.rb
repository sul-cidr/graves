class AddLonlatToTowns < ActiveRecord::Migration
  def change
    add_column :towns, :lonlat, :st_point
    add_index :towns, :lonlat, using: :gist
  end
end
