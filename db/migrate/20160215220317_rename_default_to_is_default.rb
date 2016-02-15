class RenameDefaultToIsDefault < ActiveRecord::Migration
  def change
    rename_column :base_layers, :default, :is_default
  end
end
