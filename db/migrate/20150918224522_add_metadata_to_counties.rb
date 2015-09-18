class AddMetadataToCounties < ActiveRecord::Migration
  def change
    add_column :counties, :metadata, :jsonb, null: false, default: '{}'
  end
end
