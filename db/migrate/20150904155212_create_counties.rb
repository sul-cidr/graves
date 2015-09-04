class CreateCounties < ActiveRecord::Migration
  def change

    create_table :counties do |t|
      t.integer :province_id
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.geometry :geometry, srid: 4326
    end

    add_foreign_key :counties, :provinces
    add_index :counties, :cdc_id, unique: true
    add_index :counties, :geometry, using: :gist

  end
end
