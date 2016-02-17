class CreateWmsLayers < ActiveRecord::Migration
  def change
    create_table :wms_layers do |t|

      t.string :address, null: false
      t.string :layer, null: false

      t.timestamps null: false

    end
  end
end
