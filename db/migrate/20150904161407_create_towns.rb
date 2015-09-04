class CreateTowns < ActiveRecord::Migration
  def change

    create_table :towns do |t|
      t.integer :county_id
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.geometry :geometry
    end

    add_foreign_key :towns, :counties
    add_index :towns, :cdc_id, unique: true
    add_index :towns, :geometry, using: :gist

  end
end
