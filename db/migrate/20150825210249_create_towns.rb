class CreateTowns < ActiveRecord::Migration
  def change
    create_table :towns do |t|
      t.string :cdc_id
      t.string :name_p
      t.string :name_c
    end
  end
end
