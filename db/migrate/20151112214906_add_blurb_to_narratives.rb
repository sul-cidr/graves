class AddBlurbToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :blurb, :string
  end
end
