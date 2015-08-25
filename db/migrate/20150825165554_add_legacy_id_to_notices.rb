class AddLegacyIdToNotices < ActiveRecord::Migration
  def change
    add_column :notices, :legacy_id, :integer
    add_index :notices, :legacy_id, unique: true
  end
end
