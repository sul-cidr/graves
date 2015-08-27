class MakePlaceTypeIdNotNull < ActiveRecord::Migration
  def change
    change_column_null :places, :place_type_id, false
  end
end
