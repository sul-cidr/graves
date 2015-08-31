class CreateProvinces < ActiveRecord::Migration
  def change

    create_table :provinces do |t|
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.st_polygon :geometry
    end

    add_index :provinces, :geometry, using: :gist

  end
end
