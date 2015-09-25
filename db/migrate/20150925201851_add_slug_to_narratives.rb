class AddSlugToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :slug, :string, null: false
    add_index :narratives, :slug, unique: true
  end
end
