class AddChoroplethsToCounties < ActiveRecord::Migration
  def change
    add_column :counties, :choropleths, :jsonb, null: false, default: '{}'
  end
end
