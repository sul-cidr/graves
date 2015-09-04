class CreateProvinces < ActiveRecord::Migration
  def change

    create_table :provinces do |t|
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.geometry :geometry, srid: 4326
    end

    add_index :provinces, :cdc_id, unique: true
    add_index :provinces, :geometry, using: :gist

  end
end
