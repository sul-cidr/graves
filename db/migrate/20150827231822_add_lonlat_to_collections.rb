class AddLonlatToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :lonlat, :st_point
    add_index :collections, :lonlat, using: :gist
  end
end
