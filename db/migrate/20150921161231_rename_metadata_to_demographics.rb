class RenameMetadataToDemographics < ActiveRecord::Migration
  def change
    rename_column :counties, :metadata, :demographics
  end
end
