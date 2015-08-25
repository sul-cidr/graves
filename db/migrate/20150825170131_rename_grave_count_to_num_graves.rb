class RenameGraveCountToNumGraves < ActiveRecord::Migration
  def change
    rename_column :collections, :grave_count, :num_graves
  end
end
