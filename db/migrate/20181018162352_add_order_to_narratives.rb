class AddOrderToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :order, :integer, null: true
  end
end
