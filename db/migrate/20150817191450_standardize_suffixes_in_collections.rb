class StandardizeSuffixesInCollections < ActiveRecord::Migration
  def change
    rename_column :collections, :province_e, :province_p
    rename_column :collections, :prefect_e, :prefect_p
    rename_column :collections, :county_e, :county_p
    rename_column :collections, :town_e, :town_p
    rename_column :collections, :village_e, :village_p
  end
end
