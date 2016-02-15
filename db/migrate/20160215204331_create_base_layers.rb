class CreateBaseLayers < ActiveRecord::Migration
  def change
    create_table :base_layers do |t|

      t.string :label, null: false
      t.string :url, null: false
      t.boolean :default, null: false

      t.timestamps null: false

    end
  end
end
