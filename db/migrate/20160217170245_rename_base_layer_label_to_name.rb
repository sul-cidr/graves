class RenameBaseLayerLabelToName < ActiveRecord::Migration
  def change
    rename_column :base_layers, :label, :name
  end
end
