class AddLocationColumnsToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :province_e, :string
    add_column :collections, :province_c, :string
    add_column :collections, :prefect_e, :string
    add_column :collections, :prefect_c, :string
    add_column :collections, :county_e, :string
    add_column :collections, :county_c, :string
    add_column :collections, :town_e, :string
    add_column :collections, :town_c, :string
    add_column :collections, :village_e, :string
    add_column :collections, :village_c, :string
  end
end
