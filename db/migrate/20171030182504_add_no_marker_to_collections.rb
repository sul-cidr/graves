class AddNoMarkerToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :no_marker, :boolean, default: false
  end
end
