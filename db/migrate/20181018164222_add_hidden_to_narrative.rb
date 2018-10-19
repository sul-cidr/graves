class AddHiddenToNarrative < ActiveRecord::Migration
  def change
    add_column :narratives, :hidden, :boolean, default: false
  end
end
