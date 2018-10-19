class AddYearstartYearendToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :year_start, :integer, null: true
    add_column :narratives, :year_end, :integer, null: true
  end
end
