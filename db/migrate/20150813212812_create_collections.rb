class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :grave_count
      t.string :location
      t.string :destination
      t.timestamps null: false
    end
  end
end
