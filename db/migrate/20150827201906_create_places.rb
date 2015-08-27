class CreatePlaces < ActiveRecord::Migration
  def change

    create_table :places do |t|
      t.integer :place_type_id
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.geometry :geometry
    end

    add_foreign_key :places, :place_types
    add_index :places, :cdc_id, unique: true
    add_index :places, :geometry, using: :gist

  end
end
