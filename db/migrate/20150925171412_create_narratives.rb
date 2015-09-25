class CreateNarratives < ActiveRecord::Migration
  def change

    create_table :narratives do |t|
      t.text :title
      t.text :markup
      t.timestamps null: false
    end

    add_reference :narratives, :author, {
      index: true, foreign_key: true, null: false
    }

  end
end
