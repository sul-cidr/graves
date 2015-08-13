class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.date :pub_date
      t.date :notice_date
      t.date :deadline
      t.string :url
      t.timestamps null: false
    end
  end
end
