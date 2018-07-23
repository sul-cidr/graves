class AddChoroplethToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :choropleth, :string, null: true
  end
end
