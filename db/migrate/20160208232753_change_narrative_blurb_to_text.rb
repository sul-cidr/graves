class ChangeNarrativeBlurbToText < ActiveRecord::Migration

  def up
    change_column :narratives, :blurb, :text
  end

  def down
    change_column :narratives, :blurb, :string
  end

end
