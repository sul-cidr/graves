class MakePlaceTypeNameNotNull < ActiveRecord::Migration
  def change
    change_column_null :place_types, :name, false
  end
end
