class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|

      t.string :label, null: false
      t.index :label, unique: true

      t.string :tag, null: false
      t.index :tag, unique: true

      t.timestamps null: false

    end
  end
end
