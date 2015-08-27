class CreatePlaceTypes < ActiveRecord::Migration
  def change

    create_table :place_types do |t|
      t.string :name
    end

    add_index :place_types, :name, unique: true

  end
end
