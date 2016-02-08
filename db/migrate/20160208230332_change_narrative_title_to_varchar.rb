class ChangeNarrativeTitleToVarchar < ActiveRecord::Migration

  def up
    change_column :narratives, :title, :string
  end

  def down
    change_column :narratives, :title, :text
  end

end
