class LinkSpatialTables < ActiveRecord::Migration
  def change
    add_reference :towns, :county, index: true
    add_reference :counties, :province, index: true
  end
end
