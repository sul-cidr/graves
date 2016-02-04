class AddPubDateToNarratives < ActiveRecord::Migration
  def change
    add_column :narratives, :pub_date, :date
  end
end
