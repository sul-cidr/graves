class AddLegacyIdToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :legacy_id, :integer
    add_index :collections, :legacy_id, unique: true
  end
end
