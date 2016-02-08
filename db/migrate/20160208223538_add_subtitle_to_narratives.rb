class AddSubtitleToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :subtitle, :string
  end
end
