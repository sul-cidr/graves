class RemoveIsDefaultFromBaseLayer < ActiveRecord::Migration
  def change
    remove_column :base_layers, :is_default
  end
end
