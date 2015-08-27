class CreatePlaceTypes < ActiveRecord::Migration
  def change

    create_table :place_types do |t|
      t.string :type
    end

    add_index :place_types, :type

  end
end
