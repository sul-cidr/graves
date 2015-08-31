class CreateCounties < ActiveRecord::Migration
  def change

    create_table :counties do |t|
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
      t.multi_polygon :geometry
    end

    add_index :counties, :geometry, using: :gist

  end
end
